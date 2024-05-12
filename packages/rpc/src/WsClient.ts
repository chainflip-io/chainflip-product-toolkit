import { deferredPromise, DeferredPromise, sleep } from '@/utils/async.ts';
import Client from './Client.ts';
import { RpcMethod, JsonRpcRequest, rpcResponse } from './common.ts';
import { assert } from '@/utils/functions.ts';
import { randomUUID } from 'crypto';

const once = <T extends EventTarget, K extends string>(
  target: T,
  event: K,
  opts?: { signal?: AbortSignal },
): Promise<void> =>
  new Promise((resolve, reject) => {
    let onSuccess: () => void;
    let onError: (ev: Event) => void;

    onSuccess = () => {
      target.removeEventListener('error', onError);
      resolve();
    };

    onError = (ev: Event) => {
      target.removeEventListener(event, onSuccess);
      reject(new Error('error'));
    };

    target.addEventListener(event, onSuccess, { once: true, signal: opts?.signal });
    target.addEventListener('error', onError, { once: true, signal: opts?.signal });
  });

const onceWithTimeout = <T extends EventTarget, K extends string>(
  target: T,
  event: K,
  timeout: number,
): Promise<void> =>
  new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('timeout'));
    }, timeout);

    once(target, event)
      .then(() => {
        clearTimeout(timer);
        resolve();
      })
      .catch(reject);
  });

const READY = 'READY';
const DISCONNECT = 'DISCONNECT';

export default class WsClient extends Client {
  private ws?: WebSocket;
  private reconnectAttempts = 0;
  private emitter = new EventTarget();
  private requestMap: Map<string, DeferredPromise<unknown>> = new Map();

  constructor(
    url: string,
    private readonly WebSocket: typeof globalThis.WebSocket = globalThis.WebSocket,
    private readonly logger?: typeof console,
  ) {
    super(url);
  }

  protected override getRequestId() {
    return randomUUID();
  }

  async close() {
    await this.handleClose();
  }

  private async handleClose() {
    if (!this.ws) return;
    this.ws.removeEventListener('close', this.handleDisconnect);
    this.ws.close();
    if (this.ws.readyState !== this.WebSocket.CLOSED) {
      await once(this.ws, 'close');
    }
  }

  private async connectionReady(): Promise<void> {
    if (!this.ws) {
      await this.connect();
      return;
    }
    if (this.ws.readyState === this.WebSocket.OPEN) return;
    await onceWithTimeout(this.emitter, READY, 30_000);
  }

  private handleDisconnect = async () => {
    this.emitter.dispatchEvent(new Event(DISCONNECT));

    const backoff = 250 * 2 ** this.reconnectAttempts;

    await sleep(backoff);

    await this.connect().catch(() => {
      this.reconnectAttempts = Math.min(this.reconnectAttempts + 1, 6);
    });
  };

  private handleMessage = (data: MessageEvent<any>) => {
    const parsedData = JSON.parse(data.data);

    const response = rpcResponse.safeParse(parsedData);

    if (!response.success) return;

    const { id } = response.data;

    const request = this.requestMap.get(id);

    if (!request) return;

    request.resolve(response.data);
  };

  private async connect(): Promise<void> {
    this.ws = new this.WebSocket(this.url);

    this.ws.addEventListener('message', this.handleMessage);

    // this event is also emitted if a socket fails to open, so all reconnection
    // logic will be funnelled through here
    this.ws.addEventListener('close', this.handleDisconnect, { once: true });

    if (this.ws.readyState !== this.WebSocket.OPEN) {
      await onceWithTimeout(this.ws, 'open', 30000);
    }

    this.ws.addEventListener('error', () => {
      this.ws!.close();
    });

    this.emitter.dispatchEvent(new Event(READY));

    this.reconnectAttempts = 0;
    // this.requestId = 0;
  }

  protected async send<const T extends RpcMethod>(data: JsonRpcRequest<T>): Promise<unknown> {
    let requestId = data.id;

    for (let i = 0; i < 5; i += 1) {
      try {
        await this.connectionReady();

        this.ws!.send(JSON.stringify({ ...data, id: requestId }));

        const request = deferredPromise<unknown>();

        this.requestMap.set(requestId, request);

        const controller = new AbortController();

        const timeout = sleep(30_000, { signal: controller.signal }).then(() => {
          throw new Error('timeout');
        });

        const disconnected = once(this.emitter, DISCONNECT, {
          signal: controller.signal,
        }).then(() => {
          throw new Error('disconnected');
        });

        request.promise.finally(() => {
          this.requestMap.delete(requestId);
          controller.abort();
        });

        return await Promise.race([request.promise, disconnected, timeout]);
      } catch (err) {
        if (err instanceof Error) {
          // console.error('promise rejected', err.id());
        }
        requestId = this.getRequestId();
        // retry
      }
    }

    throw new Error('max retries exceeded');
  }
}
