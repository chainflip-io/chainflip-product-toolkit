import { average, sum } from '@chainflip/utils/math';
import assert from 'assert';
import { setTimeout as sleep } from 'timers/promises';
import HandlerMap from './HandlerMap';
import {
  Block,
  Call,
  EventHandler,
  EventInfo,
  ExtrinsicInfo,
  IndexerExtrinsic,
  IndexerStore,
  Logger,
  ProcessorOptions,
  ProcessorStore,
  State,
} from './types';

export function timedMethod<P extends ProcessorStore<any, any>, I extends IndexerStore>(
  target: Processor<P, I>,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const method = descriptor.value;
  assert(typeof method === 'function');
  descriptor.value = async function (
    this: Processor<ProcessorStore<any, any>, IndexerStore>,
    ...args: unknown[]
  ) {
    const start = performance.now();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const result = await method.apply(this, args);
    this.timings[propertyKey] = performance.now() - start;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result;
  };
}

export default class Processor<P extends ProcessorStore<unknown, unknown>, I extends IndexerStore> {
  batchSize = 50;

  transactionTimeout = 10_000;

  running = false;

  protected readonly name: string;

  protected readonly eventHandlerMap: HandlerMap<string, EventHandler<P>>;

  protected readonly handledEvents: Set<string>;

  protected readonly startHeight: number = -1;

  protected timings = {
    extrinsicHandlers: 0,
    eventHandlers: {} as Record<string, number[]>,
  } as Record<string, number | Record<string, number[]>>;

  constructor(
    { batchSize, transactionTimeout, eventHandlers, name }: ProcessorOptions<P>,
    private processorStore: P,
    private indexerStore: I,
    private logger: Logger,
  ) {
    if (batchSize) this.batchSize = batchSize;
    if (transactionTimeout) this.transactionTimeout = transactionTimeout;
    this.eventHandlerMap = new HandlerMap(eventHandlers);
    this.handledEvents = new Set(eventHandlers.flatMap(({ name }) => name));
    this.name = name;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected async preBlockHook(_store: P, _block: Block): Promise<void> {
    this.timings = {
      extrinsicHandlers: 0,
      eventHandlers: {} as Record<string, number[]>,
    };

    return Promise.resolve();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected async postBlockHook(_store: P, _block: Block): Promise<void> {
    // do nothing by default
  }

  protected initialize(endHeight?: number): Promise<State> {
    return this.processorStore.initializeState(this.name, this.startHeight, endHeight);
  }

  @timedMethod
  private async fetchBlocks(height: number): Promise<Block[]> {
    const start = performance.now();
    for (let i = 0; i < 5 && this.running; i += 1) {
      try {
        const blocks = await this.indexerStore.fetchBlocks(height, this.batchSize);

        this.logger.info('blocks fetched', {
          height,
          duration: performance.now() - start,
          attempt: i,
          blocksFetched: blocks.length,
        });

        return blocks;
      } catch (error) {
        this.logger.error('failed to fetch batch', { error });
      }
    }

    throw new Error('failed to fetch batch');
  }

  @timedMethod
  protected async getEventInfo(
    store: P,
    blockId: number,
    indexInBlock: number,
  ): Promise<EventInfo<P>> {
    return store.getEventInfo(blockId, indexInBlock) as EventInfo<P>;
  }

  protected getEventHandler(name: string, specId: string) {
    const handler = this.eventHandlerMap.getHandler(name, specId);

    if (handler === null) return null;

    this.timings['eventHandlers'] ??= {};
    const timing = this.timings['eventHandlers'] as Record<string, number[]>;
    return (async (args) => {
      timing[name] ??= [];
      const start = performance.now();
      await handler(args);
      timing[name].push(performance.now() - start);
    }) as EventHandler<P>;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected async handleExtrinsic(_store: P, _block: Block, _call: Call): Promise<void> {
    // do nothing by default
  }

  @timedMethod
  protected async getExtrinsicInfo(
    store: P,
    blockHeight: number,
    extrinsic: IndexerExtrinsic | null,
  ): Promise<ExtrinsicInfo<P> | undefined> {
    if (extrinsic === null) return undefined;
    return store.getExtrinsicInfo(blockHeight, extrinsic.indexInBlock) as ExtrinsicInfo<P>;
  }

  @timedMethod
  protected async handleBlock(store: P, block: Block) {
    let start = performance.now();
    for (const call of block.calls) {
      await this.handleExtrinsic(store, block, call);
    }
    this.timings.extrinsicHandlers = performance.now() - start;

    start = performance.now();
    for (const event of block.events) {
      if (this.handledEvents.has(event.name)) {
        const handler = this.getEventHandler(event.name, block.specId);
        if (!handler) {
          this.logger.customError('processBlock error: Error routing event to a handler', {
            alertCode: 'EventHandlerError',
          });
          continue;
        }
        try {
          const [eventInfo, extrinsicInfo] = await Promise.all([
            this.getEventInfo(store, block.height, event.indexInBlock),
            this.getExtrinsicInfo(store, block.height, event.extrinsic),
          ]);

          await handler({
            prisma: store,
            block,
            event,
            eventInfo,
            extrinsicInfo,
          });
        } catch (error) {
          this.logger.customError(
            `processBlock error: Error handling event ${event.name}`,
            { alertCode: 'EventHandlerError' },
            {
              error,
              eventName: event.name,
              indexInBlock: event.indexInBlock,
              blockHeight: block.height,
              specId: block.specId,
            },
          );
          throw error;
        }
      }
    }

    let eventHandlersTotal = 0;
    let eventHandlerCount = 0;
    this.logger.info(`processBlock ${block.height} timings:`, {
      timings: {
        ...this.timings,
        eventHandlers: Object.fromEntries(
          Object.entries(this.timings.eventHandlers as Record<string, number[]>)
            .map(([key, value]) => {
              const total = sum(value);
              eventHandlerCount += value.length;
              eventHandlersTotal += total;
              return [key, { average: average(value), count: value.length, total }] as const;
            })
            .concat([
              [
                'overall',
                {
                  total: eventHandlersTotal,
                  count: eventHandlerCount,
                  average: eventHandlersTotal / eventHandlerCount,
                },
              ],
            ]),
        ),
      },
    });
  }

  private async updateState(store: P, block: Block) {
    const result = await store.updateStates(this.name, block.height);

    assert(result.count === 1, 'failed to update state, maybe another process is running');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected shouldProcessBlock(_block: Block): boolean {
    return true;
  }

  stop() {
    this.running = false;
  }

  async start() {
    this.logger.info('processing blocks');
    this.running = true;

    this.logger.info('getting latest state');
    let { height: lastBlock } = await this.initialize();
    this.logger.info(`resuming processing from block ${lastBlock}`);

    let nextBatch: Promise<Block[]> | undefined;

    while (this.running) {
      const blocks = await (nextBatch ?? this.fetchBlocks(lastBlock + 1));

      const start = performance.now();

      if (blocks.length === 0) {
        nextBatch = undefined;

        await sleep(5000);

        continue;
      }

      nextBatch =
        blocks.length === this.batchSize
          ? this.fetchBlocks(lastBlock + blocks.length + 1)
          : undefined;

      this.logger.info(
        `processing blocks from ${lastBlock + 1} to ${lastBlock + blocks.length}...`,
      );

      for (const block of blocks) {
        const state = await this.processorStore.getCurrentState(this.name);

        assert(
          state.height === lastBlock,
          'state height is not equal to lastBlock maybe another process is running',
        );

        assert(lastBlock + 1 === block.height, 'block height is not monotonically increasing');

        if (state.endHeight !== null && block.height > state.endHeight) {
          this.logger.info(`reached end height ${state.endHeight}, stopping processing`);
          this.running = false;
          break;
        }

        if (this.shouldProcessBlock(block)) {
          await this.processorStore.transaction(
            async (txClient) => {
              await this.preBlockHook(txClient, block);
              await this.handleBlock(txClient, block);
              await this.postBlockHook(txClient, block);
              await this.updateState(txClient, block);
            },
            { timeout: this.transactionTimeout },
          );
        } else {
          await this.updateState(this.processorStore, block);
        }

        lastBlock = block.height;
      }

      const end = performance.now();
      this.logger.info(
        `processed ${blocks.length} blocks in ${
          end - start
        } milliseconds, last block: ${lastBlock}`,
      );
    }
  }
}
