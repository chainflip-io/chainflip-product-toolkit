import { deferredPromise } from '@chainflip/utils/async';
import Client, { type Response } from './Client';
import {
  type JsonRpcRequest,
  type JsonRpcResponse,
  type RpcMethod,
  type RpcRequest,
  type RpcResult,
  rpcResult,
} from './common';

export default class HttpClient extends Client {
  private timer: ReturnType<typeof setTimeout> | null = null;
  private requestMap = new Map<
    string,
    {
      deferred: ReturnType<typeof deferredPromise<RpcResult<RpcMethod>>>;
      body: JsonRpcRequest<RpcMethod>;
      method: RpcMethod;
    }
  >();

  protected async send<const T extends RpcMethod>(
    request: JsonRpcRequest<T>[],
  ): Promise<Response[]> {
    let res;
    try {
      res = await fetch(this.url, {
        body: JSON.stringify(request),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      return request.map((r) => ({
        id: r.id,
        success: false,
        error: new Error('Network error', { cause: error }),
      }));
    }

    if (!res.ok) {
      return request.map((r) => ({
        id: r.id,
        success: false,
        error: new Error(`HTTP error: ${res.status}`),
      }));
    }

    try {
      const jsonRpcResponse = (await res.json()) as JsonRpcResponse[];
      return jsonRpcResponse.map((r) => ({ id: r.id as string, success: true, result: r }));
    } catch (cause) {
      return request.map((r) => ({
        id: r.id,
        success: false,
        error: new Error('Invalid JSON response', { cause }),
      }));
    }
  }

  override sendRequest<const T extends RpcMethod>(
    method: T,
    ...params: RpcRequest[T]
  ): Promise<RpcResult<T>> {
    const deferred = deferredPromise<RpcResult<T>>();
    const body = this.formatRequest(method, params);
    this.requestMap.set(body.id, { deferred, body, method });
    if (!this.timer) {
      this.timer = setTimeout(() => {
        this.timer = null;
        void this.sendBatch();
      }, 0);
    }
    return deferred.promise;
  }

  private async sendBatch() {
    const clonedMap = new Map(this.requestMap);
    this.requestMap.clear();
    const requests = [...clonedMap.values()].map((item) => item.body);
    const responses = await this.send(requests);

    for (const response of responses) {
      const clonedItem = clonedMap.get(response.id);
      if (!clonedItem) {
        continue;
      }

      if (!response.success) {
        clonedItem.deferred.reject(response.error);
        continue;
      }

      try {
        const parseResult = this.parseSingleResponse(response);
        clonedItem.deferred.resolve(rpcResult[clonedItem.method].parse(parseResult.result));
      } catch (e) {
        clonedItem.deferred.reject(e as Error);
      } finally {
        clonedMap.delete(response.id);
      }
    }

    clonedMap.forEach((item) => {
      item.deferred.reject(new Error('Could not find the result for the request'));
    });
  }
}
