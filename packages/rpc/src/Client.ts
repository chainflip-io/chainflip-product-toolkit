import {
  RpcRequest,
  RpcMethod,
  RpcResult,
  rpcResult,
  rpcResponse,
  JsonRpcRequest,
} from './common.ts';
import { assert } from '@/utils/assertion.ts';

export default abstract class Client {
  constructor(protected readonly url: string) {}

  protected abstract send<const T extends RpcMethod>(data: JsonRpcRequest<T>): Promise<unknown>;

  protected getRequestId() {
    return '1';
  }

  private formatRequest<T extends RpcMethod>(method: T, params: RpcRequest[T]): JsonRpcRequest<T> {
    return { jsonrpc: '2.0', id: this.getRequestId(), method, params } as const;
  }

  async sendRequest<const T extends RpcMethod>(
    method: T,
    ...params: RpcRequest[T]
  ): Promise<RpcResult<T>> {
    const response = await this.send(this.formatRequest(method, params));

    const parseResult = rpcResponse.safeParse(response);

    assert(parseResult.success, 'Invalid response');

    if ('error' in parseResult.data) {
      throw new Error(parseResult.data.error.message);
    }

    return rpcResult[method].parse(parseResult.data.result);
  }

  methods(): RpcMethod[] {
    return Object.keys(rpcResult) as RpcMethod[];
  }
}
