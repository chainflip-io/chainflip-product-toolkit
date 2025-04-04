import Client, { type RequestMap } from './Client';
import { type JsonRpcRequest, type JsonRpcResponse, type RpcMethod } from './common';

export default class HttpClient extends Client {
  protected override async send<const T extends RpcMethod>(
    request: JsonRpcRequest<T>[],
    requestMap: RequestMap,
  ): Promise<void> {
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
      this.handleErrorResponse(new Error('Network error', { cause: error }), requestMap);
      return;
    }

    if (!res.ok) {
      this.handleErrorResponse(new Error(`HTTP error: ${res.status}`), requestMap);
      return;
    }

    try {
      const jsonRpcResponse = (await res.json()) as JsonRpcResponse[];
      for (const r of jsonRpcResponse) {
        this.handleResponse({ id: r.id, success: true, result: r }, requestMap);
      }
    } catch (cause) {
      this.handleErrorResponse(new Error('Invalid JSON response', { cause }), requestMap);
    }
  }
}
