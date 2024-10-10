import { RpcRequest, RpcMethod, RpcResult, rpcResult, rpcResponse, JsonRpcRequest } from './common';
import { assert } from '@chainflip/utils/assertion';

export type Response =
  | { success: true; id: string; result: unknown }
  | { success: false; id: string; error: Error };
export default abstract class Client {
  queue: {
    method: RpcMethod;
    params: RpcRequest[RpcMethod];
    resolve: (value: RpcResult<RpcMethod> | PromiseLike<RpcResult<RpcMethod>>) => void;
  }[] = [];
  timer: NodeJS.Timeout | null = null;
  isRunning = false;

  constructor(protected readonly url: string) {}

  protected abstract send<const T extends RpcMethod>(
    data: JsonRpcRequest<T>[],
  ): Promise<Response[]>;

  protected getRequestId() {
    return `${this.queue.length.toString()}-${Date.now().toString()}`;
  }

  private formatRequest<T extends RpcMethod>(method: T, params: RpcRequest[T]): JsonRpcRequest<T> {
    return { jsonrpc: '2.0', id: this.getRequestId(), method, params } as const;
  }

  async sendRequest<const T extends RpcMethod>(
    method: T,
    ...params: RpcRequest[T]
  ): Promise<RpcResult<T>> {
    const processQueue = async () => {
      this.isRunning = true;
      const requests = this.queue.map((item) => this.formatRequest(item.method, item.params));
      const responses = await this.send(requests);

      requests.forEach((item, index) => {
        const response = responses.find((r) => r.id === item.id);
        if (!response) throw new Error('Could not find the result for the request');

        if (!response.success) throw response.error;

        const parseResult = rpcResponse.safeParse(response.result);

        assert(parseResult.success, 'Malformed RPC response received');

        if ('error' in parseResult.data) {
          throw new Error(
            `RPC error [${parseResult.data.error.code}]: ${parseResult.data.error.message}`,
          );
        }

        this.queue[index].resolve(rpcResult[item.method].parse(parseResult.data.result));
      });
      this.queue = [];
      this.timer = null;
      this.isRunning = false;
    };

    return new Promise((resolve) => {
      if (this.isRunning) {
        // wait for the queue to be processed
        setTimeout(() => this.sendRequest(method, ...params).then(resolve), 100);
      }
      this.queue.push({ method, params, resolve });

      if (!this.timer) {
        this.timer = setTimeout(processQueue, 1000);
      }
    });
  }

  methods(): RpcMethod[] {
    return Object.keys(rpcResult).sort() as RpcMethod[];
  }
}
