import { type DeferredPromise, deferredPromise } from '@chainflip/utils/async';
import { setTimeout as sleep } from 'timers/promises';
import {
  type RpcRequest,
  type RpcMethod,
  type RpcResult,
  rpcResult,
  type JsonRpcRequest,
  type JsonRpcResponse,
} from './common';

export type Response =
  | { success: true; id: string; result: JsonRpcResponse }
  | { success: false; id: string; error: Error };

export type RequestMap = Map<
  string,
  {
    deferred: DeferredPromise<RpcResult<RpcMethod>>;
    body: JsonRpcRequest<RpcMethod>;
    method: RpcMethod;
  }
>;

export type ClientOpts = {
  archiveNodeUrl?: string;
  retryOnHeaderNotFound?: boolean;
};

export default abstract class Client {
  private lastRequestId = 0;
  private timer: ReturnType<typeof setTimeout> | null = null;
  private requestMap: RequestMap = new Map();
  private readonly archiveNodeUrl?: string;
  private readonly retryOnHeaderNotFound: boolean;
  readonly eventTarget = new EventTarget();

  constructor(
    protected readonly url: string,
    opts: ClientOpts = {},
  ) {
    this.archiveNodeUrl = opts.archiveNodeUrl;
    this.retryOnHeaderNotFound = opts.retryOnHeaderNotFound ?? false;
  }

  protected abstract send<const T extends RpcMethod>(
    data: JsonRpcRequest<T>[],
    clonedMap: RequestMap,
  ): Promise<void>;

  private getRequestId(): string {
    try {
      return crypto.randomUUID();
    } catch {
      return String(++this.lastRequestId);
    }
  }

  private formatRequest<T extends RpcMethod>(method: T, params: RpcRequest[T]): JsonRpcRequest<T> {
    return { jsonrpc: '2.0', id: this.getRequestId(), method, params } as const;
  }

  protected handleResponse(response: Response, clonedMap: RequestMap): void {
    const clonedItem = clonedMap.get(response.id);
    if (!clonedItem) return;
    clonedMap.delete(response.id);

    if (!response.success) {
      return clonedItem.deferred.reject(response.error);
    }

    const rpcResponse = response.result;

    if ('error' in rpcResponse) {
      return clonedItem.deferred.reject(
        new Error(`RPC error [${rpcResponse.error.code}]: ${rpcResponse.error.message}`),
      );
    }

    const parseResult = rpcResult[clonedItem.method].safeParse(rpcResponse.result);

    if (parseResult.error) {
      return clonedItem.deferred.reject(parseResult.error);
    }

    clonedItem.deferred.resolve(parseResult.data);
  }

  protected handleErrorResponse(error: Error, clonedMap: RequestMap): void {
    for (const [id] of clonedMap) {
      this.handleResponse({ id, success: false, error }, clonedMap);
    }
  }

  private async handleBatch(): Promise<void> {
    const clonedMap = new Map(this.requestMap);
    this.requestMap.clear();

    const requests = [...clonedMap.values()].map((item) => item.body);

    await this.send(requests, clonedMap);

    clonedMap.forEach((item) => {
      item.deferred.reject(new Error('Could not find the result for the request'));
    });
  }

  private enqueueRequest<const T extends RpcMethod>(
    method: T,
    params: RpcRequest[T],
  ): Promise<RpcResult<T>> {
    if (!rpcResult[method]) {
      return Promise.reject(new Error(`Unknown method: ${method}`));
    }
    const deferred = deferredPromise<RpcResult<T>>();
    const body = this.formatRequest(method, params);
    this.requestMap.set(body.id, { deferred, body, method });
    if (!this.timer) {
      this.timer = setTimeout(() => {
        this.timer = null;
        void this.handleBatch();
      }, 0);
    }
    return deferred.promise;
  }

  async sendRequest<const T extends RpcMethod>(
    method: T,
    ...params: RpcRequest[T]
  ): Promise<RpcResult<T>> {
    const retries = this.retryOnHeaderNotFound ? 5 : 0;
    let lastError!: Error;

    for (let i = 0; i <= retries; i += 1) {
      const result = await this.enqueueRequest(method, params).then(
        (value) => ({ ok: true as const, value }),
        (error) => ({ ok: false as const, error: error as Error }),
      );

      if (result.ok) return result.value;

      lastError = result.error;

      if (
        i < retries &&
        lastError.message.includes('Unknown block: Header was not found in the database')
      ) {
        await sleep(6_000);
        continue;
      }

      break;
    }

    if (
      this.archiveNodeUrl &&
      lastError.message.includes('Unknown block: State already discarded')
    ) {
      this.eventTarget.dispatchEvent(
        new CustomEvent('archiveNodeFallback', { detail: { method, params } }),
      );
      return new (this.constructor as { new (url: string): Client })(
        this.archiveNodeUrl,
      ).sendRequest(method, ...params);
    }

    if (lastError instanceof Error) Error.captureStackTrace(lastError);
    throw lastError;
  }

  methods(): RpcMethod[] {
    return Object.keys(rpcResult).sort() as RpcMethod[];
  }
}
