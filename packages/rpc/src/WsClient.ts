import { randomUUID } from 'crypto';
import { deferredPromise, DeferredPromise, sleep } from '@chainflip/utils/async';
import { assertType } from '@chainflip/utils/assertion';
import Client from './Client';
import { JsonRpcRequest, RpcMethod, rpcResponse } from './common';

const once = <T extends EventTarget, K extends string>(
  target: T,
  event: K,
  opts?: { signal?: AbortSignal },
): Promise<void> =>
  new Promise((resolve, reject) => {
    const onSuccess = () => {
      target.removeEventListener('error', onError);
      resolve();
    };

    const onError = () => {
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

    once(target, event).then(() => {
      clearTimeout(timer);
      resolve();
    }, reject);
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

  private async connectionReady(): Promise<WebSocket> {
    if (!this.ws) {
      return this.connect();
    }
    if (this.ws.readyState !== this.WebSocket.OPEN) {
      await onceWithTimeout(this.emitter, READY, 30_000);
    }
    return this.ws;
  }

  private handleDisconnect = async () => {
    this.emitter.dispatchEvent(new Event(DISCONNECT));

    this.requestMap.forEach((request) => {
      request.reject(new Error('disconnected'));
    });

    this.requestMap.clear();

    const backoff = 250 * 2 ** this.reconnectAttempts;

    await sleep(backoff);

    await this.connect().catch(() => {
      this.reconnectAttempts = Math.min(this.reconnectAttempts + 1, 6);
    });
  };

  private handleMessage = (data: MessageEvent<unknown>) => {
    assertType('string', data.data);
    const parsedData = JSON.parse(data.data) as unknown;

    const response = rpcResponse.safeParse(parsedData);

    if (!response.success) return;

    const { id } = response.data;

    const request = this.requestMap.get(id);

    if (!request) return;

    request.resolve(response.data);
  };

  private async connect(): Promise<WebSocket> {
    const socket = new this.WebSocket(this.url);
    this.ws = socket;

    this.ws.addEventListener('message', this.handleMessage);

    // this event is also emitted if a socket fails to open, so all reconnection
    // logic will be funnelled through here
    this.ws.addEventListener('close', this.handleDisconnect, { once: true });

    if (this.ws.readyState !== this.WebSocket.OPEN) {
      await onceWithTimeout(this.ws, 'open', 30000);
    }

    this.ws.addEventListener('error', () => {
      socket.close();
    });

    this.emitter.dispatchEvent(new Event(READY));

    this.reconnectAttempts = 0;

    return socket;
  }

  protected async send<const T extends RpcMethod>(data: JsonRpcRequest<T>): Promise<unknown> {
    let requestId = data.id;

    for (let i = 0; i < 5; i += 1) {
      try {
        const socket = await this.connectionReady();

        socket.send(JSON.stringify({ ...data, id: requestId }));

        const request = deferredPromise<unknown>();

        this.requestMap.set(requestId, request);

        const timeout = setTimeout(() => {
          request.reject(new Error('timeout'));
        }, 30_000);

        return await request.promise.finally(() => {
          this.requestMap.delete(requestId);
          clearTimeout(timeout);
        });
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
