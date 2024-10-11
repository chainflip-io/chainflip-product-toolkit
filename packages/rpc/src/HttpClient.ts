import Client, { Response } from './Client';
import { JsonRpcRequest, JsonRpcResponse, RpcMethod } from './common';

export default class HttpClient extends Client {
  protected async send<const T extends RpcMethod>(
    request: JsonRpcRequest<T>[],
  ): Promise<Response[]> {
    const res = await fetch(this.url, {
      body: JSON.stringify(request),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

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
}
