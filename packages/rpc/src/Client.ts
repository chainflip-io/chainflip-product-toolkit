import { randomUUID } from 'crypto';
import { RpcRequest, RpcMethod, RpcResult, rpcResult, rpcResponse, JsonRpcRequest } from './common';

export type Response =
  | { success: true; id: string; result: unknown }
  | { success: false; id: string; error: Error };
export default abstract class Client {
  queue: {
    method: RpcMethod;
    params: RpcRequest[RpcMethod];
    resolve: (value: RpcResult<RpcMethod> | PromiseLike<RpcResult<RpcMethod>>) => void;
    reject: (reason?: any) => void;
  }[] = [];
  timer: NodeJS.Timeout | null = null;
  isRunning = false;

  constructor(protected readonly url: string) {}

  protected abstract send<const T extends RpcMethod>(
    data: JsonRpcRequest<T>[],
  ): Promise<Response[]>;

  protected getRequestId() {
    return randomUUID();
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
        if (!response) {
          this.queue[index].reject('Could not find the result for the request');
          return;
        }

        if (!response.success) {
          this.queue[index].reject(response.error);
          return;
        }

        const parseResult = rpcResponse.safeParse(response.result);

        if (!parseResult.success) {
          this.queue[index].reject('Malformed RPC response received');
          return;
        }

        if ('error' in parseResult.data) {
          this.queue[index].reject(
            `RPC error [${parseResult.data.error.code}]: ${parseResult.data.error.message}`,
          );
          return;
        }

        this.queue[index].resolve(rpcResult[item.method].parse(parseResult.data.result));
      });
      this.queue = [];
      this.timer = null;
      this.isRunning = false;
    };

    return new Promise((resolve, reject) => {
      if (this.isRunning) {
        // wait for the queue to be processed
        setTimeout(() => this.sendRequest(method, ...params).then(resolve), 100);
      }
      this.queue.push({ method, params, resolve, reject });

      if (!this.timer) {
        this.timer = setTimeout(processQueue, 200);
      }
    });
  }

  methods(): RpcMethod[] {
    return Object.keys(rpcResult).sort() as RpcMethod[];
  }
}
