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
    const responses: Response[] = [];

    if (!res.ok) {
      request.map((r) =>
        responses.push({ id: r.id, success: false, error: new Error(`HTTP error: ${res.status}`) }),
      );
      return responses;
    }

    try {
      const jsonRpcResponse = (await res.json()) as JsonRpcResponse[];
      request.map((r) =>
        responses.push({
          id: r.id,
          success: true,
          result: jsonRpcResponse.find((j) => j.id === r.id),
        }),
      );
      return responses;
    } catch (cause) {
      request.map((r) =>
        responses.push({
          id: r.id,
          success: false,
          error: new Error('Invalid JSON response', { cause }),
        }),
      );
      return responses;
    }
  }
}
