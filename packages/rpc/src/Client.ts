import { type DeferredPromise, deferredPromise } from '@chainflip/utils/async';
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

export default abstract class Client {
  private lastRequestId = 0;
  private timer: ReturnType<typeof setTimeout> | null = null;
  private requestMap: RequestMap = new Map();

  constructor(protected readonly url: string) {}

  protected abstract send<const T extends RpcMethod>(
    data: JsonRpcRequest<T>[],
    clonedMap: RequestMap,
  ): Promise<void>;

  private getRequestId() {
    try {
      return crypto.randomUUID();
    } catch {
      return String(++this.lastRequestId);
    }
  }

  private formatRequest<T extends RpcMethod>(method: T, params: RpcRequest[T]): JsonRpcRequest<T> {
    return { jsonrpc: '2.0', id: this.getRequestId(), method, params } as const;
  }

  private parseSingleResponse(response: Response): unknown {
    if (!response.success) {
      throw response.error;
    }

    const parseResult = response.result;

    if ('error' in parseResult) {
      throw new Error(`RPC error [${parseResult.error.code}]: ${parseResult.error.message}`);
    }

    return parseResult.result;
  }

  protected handleResponse(response: Response, clonedMap: RequestMap) {
    const clonedItem = clonedMap.get(response.id);
    if (!clonedItem) return;

    try {
      const parsedResponse = this.parseSingleResponse(response);
      const parser = rpcResult[clonedItem.method];
      clonedItem.deferred.resolve(parser.parse(parsedResponse));
    } catch (error) {
      clonedItem.deferred.reject(error as Error);
    } finally {
      clonedMap.delete(response.id);
    }
  }

  protected handleErrorResponse(error: Error, clonedMap: RequestMap) {
    for (const [id] of clonedMap) {
      this.handleResponse({ id, success: false, error }, clonedMap);
    }
  }

  private async handleBatch() {
    const clonedMap = new Map(this.requestMap);
    this.requestMap.clear();

    const requests = [...clonedMap.values()].map((item) => item.body);

    await this.send(requests, clonedMap);

    clonedMap.forEach((item) => {
      item.deferred.reject(new Error('Could not find the result for the request'));
    });
  }

  sendRequest<const T extends RpcMethod>(
    method: T,
    ...params: RpcRequest[T]
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

  methods(): RpcMethod[] {
    return Object.keys(rpcResult).sort() as RpcMethod[];
  }
}
