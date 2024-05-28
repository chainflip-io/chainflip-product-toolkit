import assert from 'assert';
import { setTimeout as sleep } from 'timers/promises';
import HandlerMap from './HandlerMap';
import { Extrinsic, State, Block, Call, Event, EventHandler, ProcessorOptions } from './types';

const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);
const average = (arr: number[]) => sum(arr) / arr.length;

type TimedMethodName = Exclude<keyof (typeof Processor.prototype)['timings'], 'eventHandlers'>;
export function timedMethod(
  target: Processor<IProcessorStore, IIndexerStore>,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const method = descriptor.value;
  assert(typeof method === 'function');
  // eslint-disable-next-line func-names
  descriptor.value = async function (
    this: Processor<IProcessorStore, IIndexerStore>,
    ...args: unknown[]
  ) {
    const start = performance.now();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const result = await method.apply(this, args);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    this.timings[propertyKey as TimedMethodName] = performance.now() - start;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result;
  };
}

type Handler = () => Promise<void> | void;
export const handlers = new Set<Handler>();
export const handleExit = (handler: Handler) => {
  handlers.add(handler);
  return () => {
    handlers.delete(handler);
  };
};

export interface IProcessorStore {
  getEventId(blockId: number, indexInBlock: number): Promise<bigint>;
  initializeState(endHeight?: number): Promise<State>;
  findEventByBlock(blockId: number, indexInBlock: number): Promise<Event>;
  getExtrinsicSubmitterId(
    blockHeight: number,
    extrinsic: Extrinsic | null,
  ): Promise<number | undefined>;
  updateStates(processorName: string, height: number): Promise<number>;
  getCurrentState(processorName: string): State;
  $transaction(fn: (store: this) => Promise<void>, options: { timeout?: number }): Promise<this>;
}

export interface IIndexerStore {
  fetchBlocks(height: number, batchSize: number): Promise<Block[]>;
  $transaction(fn: (store: this) => Promise<void>, options: { timeout?: number }): Promise<this>;
}

export interface ILogger {
  info(message: string, data?: Record<string, unknown>): void;
  error(message: string, data?: Record<string, unknown>): void;
  customError(
    message: string,
    data: Record<string, unknown>,
    extraData?: Record<string, unknown>,
  ): void;
}

export default abstract class Processor<P extends IProcessorStore, I extends IIndexerStore> {
  batchSize = 50;

  transactionTimeout = 10_000;

  running = false;

  protected abstract readonly name: string;

  protected readonly eventHandlerMap: HandlerMap<string, EventHandler>;

  protected readonly handledEvents: Set<string>;

  protected readonly startHeight: number = -1;

  protected timings = {
    buildAndSaveMetadata: 0,
    shells: 0,
    createExtrinsics: 0,
    createEvents: 0,
    extrinsicHandlers: 0,
    limitOrderHandlerPreBlockHook: 0,
    limitOrderHandlerPostBlockHook: 0,
    rangeOrderHandlerPreBlockHook: 0,
    rangeOrderHandlerPostBlockHook: 0,
    transactionFeePaidPostBlockHook: 0,
    purgeNoFeeCollectedOrdersPostBlockHook: 0,
    eventHandlers: {} as Record<string, number[]>,
  };

  constructor(
    { batchSize, transactionTimeout, eventHandlers }: ProcessorOptions,
    private processorStore: P,
    private indexerStore: I,
    private logger: ILogger,
  ) {
    if (batchSize) this.batchSize = batchSize;
    if (transactionTimeout) this.transactionTimeout = transactionTimeout;
    this.eventHandlerMap = new HandlerMap(eventHandlers);
    this.handledEvents = new Set(
      eventHandlers.flatMap(({ handlers }) => handlers.map(({ name }) => name)),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected async preBlockHook(_store: P, _block: Block): Promise<void> {
    this.timings = {
      buildAndSaveMetadata: 0,
      shells: 0,
      createExtrinsics: 0,
      createEvents: 0,
      extrinsicHandlers: 0,
      limitOrderHandlerPreBlockHook: 0,
      limitOrderHandlerPostBlockHook: 0,
      rangeOrderHandlerPreBlockHook: 0,
      rangeOrderHandlerPostBlockHook: 0,
      transactionFeePaidPostBlockHook: 0,
      purgeNoFeeCollectedOrdersPostBlockHook: 0,
      eventHandlers: {} as Record<string, number[]>,
    };

    return Promise.resolve();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected async postBlockHook(_store: P, _block: Block): Promise<void> {
    // do nothing by default
  }

  protected initialize(endHeight?: number): Promise<State> {
    return this.processorStore.initializeState(endHeight);
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
  protected async getEventId(store: P, blockId: number, indexInBlock: number): Promise<bigint> {
    return store.getEventId(blockId, indexInBlock);
  }

  protected getEventHandler(name: string, specId: string) {
    const handler = this.eventHandlerMap.getHandler(name, specId);

    if (handler === null) return null;

    return (async (args) => {
      this.timings.eventHandlers[name] ??= [];
      const start = performance.now();
      await handler(args);
      this.timings.eventHandlers[name].push(performance.now() - start);
    }) as EventHandler;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected async handleExtrinsic(_store: P, _block: Block, _call: Call): Promise<void> {
    // do nothing by default
  }

  @timedMethod
  protected async getSubmitterId(
    store: P,
    blockHeight: number,
    extrinsic: Extrinsic | null,
  ): Promise<number | undefined> {
    if (extrinsic === null) return undefined;

    const id = await store.getExtrinsicSubmitterId(blockHeight, extrinsic);
    return id;
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
          const [eventId, submitterId] = await Promise.all([
            this.getEventId(store, block.height, event.indexInBlock),
            this.getSubmitterId(store, block.height, event.extrinsic),
          ]);

          await handler({
            prisma: store,
            block,
            event,
            eventId,
            submitterId,
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
          Object.entries(this.timings.eventHandlers)
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
    const count = await store.updateStates(this.name, block.height);

    assert(count === 1, 'failed to update state, maybe another process is running');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected shouldProcessBlock(_block: Block): boolean {
    return true;
  }

  async start() {
    this.logger.info('processing blocks');
    this.running = true;

    handleExit(() => {
      this.logger.info('stopping processing of blocks');
      this.running = false;
    });

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
        const state = this.processorStore.getCurrentState(this.name);

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
          await this.processorStore.$transaction(
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
