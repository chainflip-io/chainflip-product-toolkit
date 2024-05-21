import { once } from 'events';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AddressInfo, WebSocket, WebSocketServer } from 'ws';
import WsClient from '../WsClient';

describe(WsClient, () => {
  let serverClosed = false;
  let server: WebSocketServer;

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
        const rpcRequest = JSON.parse(data.toString()) as { id: number };

        ws.send(
          JSON.stringify({
            id: rpcRequest.id,
            jsonrpc: '2.0',
            result: { intermediary: null, output: '0x1' },
          }),
        );
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
    await once(client['emitter'], 'DISCONNECT');

    expect(connectSpy).not.toHaveBeenCalled();

    for (let i = 0; i < 7; i += 1) {
      const promise = once(client['emitter'], 'DISCONNECT');
      await vi.advanceTimersToNextTimerAsync();
      await promise;
      expect(connectSpy).toHaveBeenCalledTimes(i + 1);
    }

    expect(connectSpy).toHaveBeenCalledTimes(7);
  });
});
