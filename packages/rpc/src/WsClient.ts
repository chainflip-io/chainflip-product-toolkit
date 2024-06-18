import { DeferredPromise, deferredPromise, once, sleep } from '@chainflip/utils/async';
import { randomUUID } from 'crypto';
import Client from './Client';
import { JsonRpcRequest, RpcMethod, rpcResponse } from './common';
import { noop } from './utils';

const READY = 'READY';
const DISCONNECT = 'DISCONNECT';

export default class WsClient extends Client {
  private ws?: WebSocket;
  private reconnectAttempts = 0;
  private emitter = new EventTarget();
  private requestMap: Map<string | number, DeferredPromise<unknown>> = new Map();

  protected override getRequestId() {
    return randomUUID();
  }

  async close() {
    await this.handleClose();
  }

  private async handleClose() {
    if (
      !this.ws ||
      this.ws.readyState === WebSocket.CLOSED ||
      this.ws.readyState === WebSocket.CLOSING
    ) {
      return;
    }
    this.ws.removeEventListener('close', this.handleDisconnect);
    const closed = once(this.ws, 'close');
    this.ws.close();
    try {
      await closed;
    } catch {
      // nothing to do really
    }
  }

  private async connectionReady(): Promise<WebSocket> {
    if (!this.ws) {
      return this.connect();
    }
    if (this.ws.readyState !== WebSocket.OPEN) {
      await once(this.emitter, READY, { timeout: 30_000 });
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
      setTimeout(() => {
        this.handleDisconnect().catch(noop);
      }, 1);
    });
  };

  private handleMessage = (data: MessageEvent<string>) => {
    const parsedData = JSON.parse(data.data) as unknown;

    const response = rpcResponse.safeParse(parsedData);

    if (!response.success) {
      this.emitter.dispatchEvent(new CustomEvent('error', { detail: response.error }));
      return;
    }

    const { id } = response.data;

    this.requestMap.get(id)?.resolve(response.data);
  };

  private async connect(): Promise<WebSocket> {
    const socket = new WebSocket(this.url);
    this.ws = socket;

    this.ws.addEventListener('message', this.handleMessage);

    this.ws.addEventListener('close', this.handleDisconnect, { once: true });

    await once(this.ws, 'open', { timeout: 30_000 });

    this.ws.addEventListener('error', () => {
      socket.close();
    });

    this.emitter.dispatchEvent(new Event(READY));

    this.reconnectAttempts = 0;

    return socket;
  }

  protected async send<const T extends RpcMethod>(
    data: JsonRpcRequest<T>,
  ): Promise<{ success: true; result: unknown } | { success: false; error: Error }> {
    let requestId = data.id;

    for (let i = 0; i < 5; i += 1) {
      let socket;
      try {
        socket = await this.connectionReady();
      } catch {
        // retry
        continue;
      }

      socket.send(JSON.stringify({ ...data, id: requestId }));

      const request = deferredPromise<unknown>();

      this.requestMap.set(requestId, request);

      const controller = new AbortController();
      const result = await Promise.race([
        sleep(30_000, { signal: controller.signal }).then(
          () => ({ success: false, retry: false, error: new Error('timeout') }) as const,
        ),
        request.promise.then(
          (result) => ({ success: true, result }) as const,
          (error) => ({ success: false, error: error as Error, retry: true }) as const,
        ),
      ]).finally(() => {
        this.requestMap.delete(requestId);
        controller.abort();
      });

      if (result.success || !result.retry) return result;

      requestId = this.getRequestId();
    }

    return { success: false, error: new Error('max retries exceeded') };
  }
}
