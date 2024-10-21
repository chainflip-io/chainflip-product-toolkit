export type JsonObject = { [Key in string]?: JsonValue };
export type JsonArray = Array<JsonValue>;
export type JsonValue = string | number | boolean | JsonObject | JsonArray | null;

export type IndexerExtrinsic = {
  id: string;
  blockId: string;
  indexInBlock: number;
  version: number;
  signature: JsonValue | null;
  callId: string;
  fee: any; // Prisma.Decimal
  tip: any; // Prisma.Decimal
  success: boolean;
  error: JsonValue | null;
  pos: number;
  hash: string;
};

export type IndexerEvent = {
  id: string;
  blockId: string;
  indexInBlock: number;
  phase: string;
  extrinsicId: string | null;
  callId: string | null;
  name: string;
  args: JsonValue;
  pos: number;
  extrinsic: IndexerExtrinsic | null;
};

export type IndexerCall = {
  id: string;
  parentId: string | null;
  blockId: string;
  extrinsicId: string;
  name: string;
  args: JsonValue;
  success: boolean;
  error: JsonValue;
  origin: JsonValue;
  pos: number;
};

export type IndexerBlock = {
  id: string;
  height: number;
  hash: string;
  parentHash: string;
  stateRoot: string;
  extrinsicsRoot: string;
  timestamp: Date;
  validator: string | null;
  specId: string;
};

export type Call = IndexerCall & { extrinsic: IndexerExtrinsic };

export type Block = IndexerBlock & {
  extrinsics: IndexerExtrinsic[];
  events: IndexerEvent[];
  calls: Call[];
};

interface Store {
  transaction<R>(
    fn: (store: Exclude<this, 'transaction'>) => Promise<R>,
    options: { timeout?: number },
  ): Promise<R>;
}

export interface ProcessorStore<Ev, Ex> extends Store {
  initializeState(processorName: string, startHeight: number, endHeight?: number): Promise<State>;
  getEventInfo(blockId: number, indexInBlock: number): Promise<Ev>;
  getExtrinsicInfo(blockHeight: number, indexInBlock: number): Promise<Ex>;
  updateState(processorName: string, height: number): Promise<boolean>;
  getCurrentState(processorName: string): Promise<State>;
}

export interface IndexerStore {
  fetchBlocks(
    height: number,
    batchSize: number,
    filter?: {
      eventNames?: string[];
      callNames?: string[];
    },
  ): Promise<Block[]>;
}

export interface Logger {
  info(message: string, data?: Record<string, unknown>): void;
  error(message: string, data?: Record<string, unknown>): void;
  customError(
    message: string,
    data: Record<string, unknown>,
    extraData?: Record<string, unknown>,
  ): void;
}

export type EventInfo<P extends ProcessorStore<any, any>> = ReturnType<P['getEventInfo']>;
export type ExtrinsicInfo<P extends ProcessorStore<any, any>> = ReturnType<P['getExtrinsicInfo']>;

export type ProcessorOptions<T extends ProcessorStore<any, any>> = {
  batchSize?: number;
  transactionTimeout?: number;
  eventHandlers: { name: string; handler: EventHandler<T>; spec: number }[];
  name: string;
};

export type State = {
  id: number;
  height: number;
  endHeight: number | null;
  name: string;
};

export type EventHandler<T extends ProcessorStore<any, any>> = (args: {
  prisma: T;
  event: IndexerEvent;
  block: Block;
  eventInfo: Awaited<ReturnType<T['getEventInfo']>>;
  extrinsicInfo?: Awaited<ReturnType<T['getExtrinsicInfo']>> | undefined;
}) => Promise<void>;
