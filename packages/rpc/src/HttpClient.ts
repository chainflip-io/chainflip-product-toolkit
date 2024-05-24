import Client from './Client';
import { JsonRpcRequest, RpcMethod } from './common';

export default class HttpClient extends Client {
  protected async send<const T extends RpcMethod>(
    request: JsonRpcRequest<T>,
  ): Promise<{ success: true; result: unknown } | { success: false; error: Error }> {
    const res = await fetch(this.url, {
      body: JSON.stringify(request),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      return { success: false, error: new Error(`HTTP error: ${res.status}`) };
    }

    try {
      const result = (await res.json()) as unknown;
      return { success: true, result };
    } catch (error) {
      return { success: false, error: new Error('Invalid JSON response') };
    }
  }
}
