/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProcessorStore } from './Processor';

export type JsonObject = { [Key in string]?: JsonValue };
export interface JsonArray extends Array<JsonValue> {}
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

export type Event = {
  id: bigint;
  args: JsonValue;
  blockId: number;
  indexInBlock: number;
  extrinsicId: bigint | null;
  metadataId: number;
};
export type Extrinsic = {
  id: bigint;
  submitterId: number | null;
};

export type NonEmptyArray<T> = readonly [T, ...T[]];

export type SpecEventHandlers<T extends ProcessorStore> = {
  spec: number;
  handlers: NonEmptyArray<{ name: string; handler: EventHandler<T> }>;
};

export type ProcessorOptions<T extends ProcessorStore> = {
  batchSize?: number;
  transactionTimeout?: number;
  eventHandlers: NonEmptyArray<SpecEventHandlers<T>>;
};

export type State = {
  id: number;
  height: number;
  endHeight: number | null;
  name: string;
};

export type EventHandler<T extends ProcessorStore> = (args: {
  prisma: T;
  event: IndexerEvent;
  block: Block;
  eventId: bigint;
  submitterId?: number;
}) => Promise<void>;
