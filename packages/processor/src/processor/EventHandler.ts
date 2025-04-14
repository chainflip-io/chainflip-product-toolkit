import { z } from 'zod';
import type { Block, IndexerEvent, ProcessorStore, Semver } from './types';

export default abstract class EventHandler<
  T extends ProcessorStore<any, any>,
  Z extends z.ZodTypeAny,
> {
  protected abstract readonly eventName: string;
  protected abstract readonly spec: Semver;
  protected abstract readonly parser: Z;

  protected async preBlockHook(_store: unknown, _block: unknown): Promise<void> {
    // do nothing by default
  }

  protected async postBlockHook(_store: unknown, _block: unknown): Promise<void> {
    // do nothing by default
  }

  protected abstract handle(args: {
    prisma: T;
    event: IndexerEvent;
    block: Block;
    eventInfo: Awaited<ReturnType<T['getEventInfo']>>;
    extrinsicInfo?: Awaited<ReturnType<T['getExtrinsicInfo']>> | undefined;
    args: z.output<Z>;
  }): Promise<void>;

  call(args: {
    prisma: T;
    event: IndexerEvent;
    block: Block;
    eventInfo: Awaited<ReturnType<T['getEventInfo']>>;
    extrinsicInfo?: Awaited<ReturnType<T['getExtrinsicInfo']>> | undefined;
  }): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return this.handle({ ...args, args: this.parser.parse(args.event.args) });
  }
}
