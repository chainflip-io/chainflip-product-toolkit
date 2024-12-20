import { assert } from '@chainflip/utils/assertion';
import {
  type RpcRequest,
  type RpcMethod,
  type RpcResult,
  rpcResult,
  rpcResponse,
  type JsonRpcRequest,
} from './common';

export type Response =
  | { success: true; id: string; result: unknown }
  | { success: false; id: string; error: Error };
export default abstract class Client {
  private lastRequestId = 0;

  constructor(protected readonly url: string) {}

  protected abstract send<const T extends RpcMethod>(
    data: JsonRpcRequest<T>[],
  ): Promise<Response[]>;

  protected getRequestId() {
    return String(++this.lastRequestId);
  }

  protected formatRequest<T extends RpcMethod>(
    method: T,
    params: RpcRequest[T],
  ): JsonRpcRequest<T> {
    return { jsonrpc: '2.0', id: this.getRequestId(), method, params } as const;
  }

  protected parseSingleResponse(response: Response) {
    if (!response.success) {
      throw response.error;
    }

    const parseResult = rpcResponse.safeParse(response.result);

    if (!parseResult.success) {
      throw new Error('Malformed RPC response received');
    }

    if ('error' in parseResult.data) {
      throw new Error(
        `RPC error [${parseResult.data.error.code}]: ${parseResult.data.error.message}`,
      );
    }

    assert('result' in parseResult.data);

    return parseResult.data;
  }

  async sendRequest<const T extends RpcMethod>(
    method: T,
    ...params: RpcRequest[T]
  ): Promise<RpcResult<T>> {
    const [response] = await this.send([this.formatRequest(method, params)]);
    if (!response.success) throw response.error;

    const parseResult = this.parseSingleResponse(response);
    return rpcResult[method].parse(parseResult.result);
  }

  methods(): RpcMethod[] {
    return Object.keys(rpcResult).sort() as RpcMethod[];
  }
}
