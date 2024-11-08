import { once } from 'events';
import { type Mock, afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { type AddressInfo, WebSocket, WebSocketServer } from 'ws';
import { type JsonRpcRequest, type RpcMethod } from '../common';
import WsClient from '../WsClient';

describe(WsClient, () => {
  let serverClosed = false;
  let server: WebSocketServer;
  let serverFn: Mock | undefined;

  const closeServer = () => {
    server.close();
    serverClosed = true;
  };

  let client: WsClient;
  const killConnections = () => {
    server.clients.forEach((c) => {
      c.terminate();
    });
  };

  beforeEach(async () => {
    serverClosed = false;
    server = new WebSocketServer({ port: 0, host: '127.0.0.1' });

    server.on('connection', (ws) => {
      ws.on('message', (data) => {
        const rpcRequest = JSON.parse(data.toString()) as JsonRpcRequest<RpcMethod>;

        if (rpcRequest.method === 'cf_swap_rate') {
          ws.send(
            JSON.stringify({
              id: rpcRequest.id,
              jsonrpc: '2.0',
              result: { intermediary: null, output: '0x1' },
            }),
          );
        }

        // tests the retry logic
        if (rpcRequest.method === 'cf_environment') {
          ws.close();
          serverFn?.();
        }

        // tests the timeout logic
        if (rpcRequest.method === 'cf_supported_assets') {
          serverFn?.();
          // do nothing
        }

        // tests malformed response handling
        if (rpcRequest.method === 'cf_swapping_environment') {
          serverFn?.();
          ws.send(JSON.stringify([{}]));
        }
      });
    });

    await once(server, 'listening');
    const address = server.address() as AddressInfo;
    client = new WsClient(
      `ws://127.0.0.1:${address.port}`,
      WebSocket as unknown as typeof globalThis.WebSocket,
    );
  });

  afterEach(async () => {
    serverFn = undefined;
    await client.close();
    server.close();
    if (!serverClosed) await once(server, 'close');
    vi.useRealTimers();
  });

  it('resends messages if a disconnection happens while awaiting a response', async () => {
    const response = await client.sendRequest(
      'cf_swap_rate',
      { asset: 'USDC', chain: 'Ethereum' },
      { asset: 'FLIP', chain: 'Ethereum' },
      '0x1',
    );

    expect(response).toEqual({ intermediary: null, output: 1n });

    killConnections();

    const response2 = await client.sendRequest(
      'cf_swap_rate',
      { asset: 'USDC', chain: 'Ethereum' },
      { asset: 'FLIP', chain: 'Ethereum' },
      '0x1',
    );
    expect(response2).toEqual({ intermediary: null, output: 1n });
  });

  it("doesn't spam the reconnect", async () => {
    vi.useFakeTimers();
    const response = await client.sendRequest(
      'cf_swap_rate',
      { asset: 'USDC', chain: 'Ethereum' },
      { asset: 'FLIP', chain: 'Ethereum' },
      '0x1',
    );
    expect(response).toEqual({ intermediary: null, output: 1n });

    killConnections();
    closeServer();
    const connectSpy = vi.spyOn(client, 'connect' as any);
    await once(client.emitter, 'DISCONNECT');

    expect(connectSpy).not.toHaveBeenCalled();

    for (let i = 0; i < 7; i += 1) {
      const promise = once(client.emitter, 'DISCONNECT');
      await vi.advanceTimersToNextTimerAsync();
      await promise;
      expect(connectSpy).toHaveBeenCalledTimes(i + 1);
    }

    expect(connectSpy).toHaveBeenCalledTimes(7);
  });

  it('only retries 5 times', async () => {
    serverFn = vi.fn();

    await expect(client.sendRequest('cf_environment')).rejects.toThrowError('max retries exceeded');

    expect(serverFn).toHaveBeenCalledTimes(5);
  });

  it('reconnects if the socket emits an error', async () => {
    await expect(
      client.sendRequest(
        'cf_swap_rate',
        { asset: 'USDC', chain: 'Ethereum' },
        { asset: 'FLIP', chain: 'Ethereum' },
        '0x1',
      ),
    ).resolves.not.toThrow();
    expect(client.ws).toBeDefined();
    (client.ws as unknown as WebSocket).emit('error', new Error('test'));
    await once(client.emitter, 'DISCONNECT');
    await expect(
      client.sendRequest(
        'cf_swap_rate',
        { asset: 'USDC', chain: 'Ethereum' },
        { asset: 'FLIP', chain: 'Ethereum' },
        '0x1',
      ),
    ).resolves.not.toThrow();
  });

  it('rejects if no response is received', async () => {
    await expect(
      client.sendRequest(
        'cf_swap_rate',
        { asset: 'USDC', chain: 'Ethereum' },
        { asset: 'FLIP', chain: 'Ethereum' },
        '0x1',
      ),
    ).resolves.not.toThrow();

    vi.useFakeTimers();
    serverFn = vi.fn();

    const request = client.sendRequest('cf_supported_assets');

    await Promise.all([
      vi.advanceTimersToNextTimerAsync(),
      expect(request).rejects.toThrowError('timeout'),
    ]);

    expect(serverFn).toHaveBeenCalledTimes(1);
  });

  it('tries 5 times to reconnect', async () => {
    const spy = vi
      .spyOn(WsClient.prototype, 'connectionReady' as any)
      .mockRejectedValue(new Error('test'));

    await expect(
      client.sendRequest(
        'cf_swap_rate',
        { asset: 'USDC', chain: 'Ethereum' },
        { asset: 'FLIP', chain: 'Ethereum' },
        '0x1',
      ),
    ).rejects.toThrow();

    expect(spy).toBeCalledTimes(5);
  });

  it('times out on a malformed response', async () => {
    await expect(
      client.sendRequest(
        'cf_swap_rate',
        { asset: 'USDC', chain: 'Ethereum' },
        { asset: 'FLIP', chain: 'Ethereum' },
        '0x1',
      ),
    ).resolves.not.toThrow();

    vi.useFakeTimers();
    serverFn = vi.fn();
    const request = client.sendRequest('cf_swapping_environment');

    await Promise.all([
      vi.advanceTimersToNextTimerAsync(),
      expect(request).rejects.toThrowError('timeout'),
    ]);

    expect(serverFn).toHaveBeenCalledTimes(1);
  });

  it('uses the global websocket if none is provided', () => {
    expect(new WsClient('ws://hello.world').WebSocket).toBe(globalThis.WebSocket);
  });
});
