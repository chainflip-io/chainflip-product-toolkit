import { deferredPromise, type DeferredPromise, once, sleep } from '@chainflip/utils/async';
import { z } from 'zod';
import Client, { type RequestMap } from './Client';
import { type JsonRpcRequest, type JsonRpcResponse, type RpcMethod, rpcResponse } from './common';

const CONNECTING = 'CONNECTING';
const READY = 'READY';
const DISCONNECT = 'DISCONNECT';

export default class WsClient extends Client {
  private ws?: WebSocket;
  private reconnectAttempts = 0;
  private emitter = new EventTarget();
  private inFlightRequestMap: Map<string, DeferredPromise<JsonRpcResponse>> = new Map();
  private readonly timeout: number;
  private shouldConnect = true;

  constructor(url: string, { timeout = 30_000 }: { timeout?: number } = {}) {
    super(url);
    this.timeout = timeout;
  }

  async close() {
    this.shouldConnect = false;
    if (!this.ws) return;
    await this.handleDisconnect();
    const waitForClose = this.ws.readyState === WebSocket.OPEN;
    this.ws.close();
    if (waitForClose) await once(this.ws, 'close');
    this.ws = undefined;
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

    this.inFlightRequestMap.forEach((request) => {
      request.reject(new Error('disconnected'));
    });

    this.inFlightRequestMap.clear();

    if (!this.shouldConnect) return;

    const backoff = 250 * 2 ** this.reconnectAttempts;

    await sleep(backoff);

    await this.connect().catch(() => {
      this.reconnectAttempts = Math.min(this.reconnectAttempts + 1, 6);
    });
  };

  private handleMessage = (data: MessageEvent<string>) => {
    const parsedData = JSON.parse(data.data) as unknown;

    const responses = z.array(rpcResponse).safeParse(parsedData);

    if (!responses.success) return;

    for (const response of responses.data) {
      const { id } = response;
      this.inFlightRequestMap.get(id)?.resolve(response);
    }
  };

  private async connect(): Promise<WebSocket> {
    this.shouldConnect = true;
    this.emitter.dispatchEvent(new Event(CONNECTING));
    const socket = new WebSocket(this.url);
    this.ws = socket;

    this.ws.addEventListener('message', this.handleMessage);

    let connected = false;

    const handleConnectionError = () => {
      if (!connected) {
        void this.handleDisconnect();
      }
    };

    // this event is also emitted if a socket fails to open, so all reconnection
    // logic will be funnelled through here
    this.ws.addEventListener('close', this.handleDisconnect, { once: true });
    this.ws.addEventListener('error', handleConnectionError, { once: true });

    await once(this.ws, 'open', { timeout: this.timeout });

    connected = true;

    this.ws.addEventListener('error', () => {
      socket.close();
    });

    this.emitter.dispatchEvent(new Event(READY));
    this.ws.removeEventListener('error', handleConnectionError);

    this.reconnectAttempts = 0;

    return socket;
  }

  protected async send(
    requests: JsonRpcRequest<RpcMethod>[],
    requestMap: RequestMap,
  ): Promise<void> {
    const MAX_RETRIES = 5;

    let socket;
    for (let i = 0; i < MAX_RETRIES; i += 1) {
      try {
        socket = await this.connectionReady();
      } catch {
        // retry
        continue;
      }
    }

    if (!socket) {
      this.handleErrorResponse(new Error('failed to connect'), requestMap);
      return;
    }

    socket.send(JSON.stringify(requests));

    const promises: Promise<void>[] = [];
    for (const [id] of requestMap) {
      const result = deferredPromise<JsonRpcResponse>();
      const controller = new AbortController();
      this.inFlightRequestMap.set(id, result);
      promises.push(
        Promise.race([
          sleep(this.timeout, { signal: controller.signal }).then(
            () => ({ id, success: false, error: new Error('timeout') }) as const,
          ),
          result.promise.then(
            (r) => ({ id, success: true, result: r }) as const,
            (error: unknown) => ({ id, success: false, error: error as Error }) as const,
          ),
        ])
          .then((response) => {
            this.handleResponse(response, requestMap);
          })
          .finally(() => {
            this.inFlightRequestMap.delete(id);
            controller.abort();
          }),
      );
    }
    await Promise.all(promises);
  }
}
