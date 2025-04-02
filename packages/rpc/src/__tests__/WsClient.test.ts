/* eslint-disable dot-notation */
import { sleep } from '@chainflip/utils/async';
import { ChainAssetMap } from '@chainflip/utils/chainflip';
import { once } from 'events';
import { type Mock, afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { type AddressInfo, WebSocketServer } from 'ws';
import { type JsonRpcRequest, type RpcMethod } from '../common';
import WsClient from '../WsClient';

const createChainAssetMap = <T>(value: T): ChainAssetMap<T> => ({
  Bitcoin: { BTC: value },
  Ethereum: { ETH: value, FLIP: value, USDC: value, USDT: value },
  Polkadot: { DOT: value },
  Arbitrum: { ETH: value, USDC: value },
  Solana: { SOL: value, USDC: value },
  Assethub: { DOT: value, USDC: value, USDT: value },
});

vi.mock(
  '@chainflip/utils/async',
  async (importActual: () => Promise<typeof import('@chainflip/utils/async')>) => ({
    ...(await importActual()),
    sleep: vi.fn<typeof sleep>(async (...args) => {
      const original = (await importActual()).sleep;
      return original(...args);
    }),
  }),
);

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
        const rpcRequests = JSON.parse(data.toString()) as JsonRpcRequest<RpcMethod>[];

        ws.send(
          JSON.stringify(
            rpcRequests.map((req) => {
              if (req.method === 'cf_swap_rate') {
                return {
                  id: req.id,
                  jsonrpc: '2.0',
                  result: { intermediary: null, output: '0x1' },
                };
              }

              // tests the timeout logic
              if (req.method === 'cf_supported_assets') {
                serverFn?.();
                // do nothing
                return {};
              }

              if (req.method === 'cf_accounts') {
                return {
                  id: req.id,
                  jsonrpc: '2.0',
                  result: [
                    ['account 1', ''],
                    ['account 2', ''],
                  ],
                };
              }

              if (req.method === 'cf_account_info') {
                if (req.params[0] === 'account 1') {
                  return {
                    id: req.id,
                    jsonrpc: '2.0',
                    result: {
                      role: 'unregistered',
                      flip_balance: '0x0',
                      asset_balances: createChainAssetMap('0x0'),
                    },
                  };
                }
                if (req.params[0] === 'account 2') {
                  return {
                    id: req.id,
                    jsonrpc: '2.0',
                    result: {
                      role: 'unregistered',
                      flip_balance: '0x10',
                      asset_balances: createChainAssetMap('0x0'),
                    },
                  };
                }
              }

              throw new Error('unreachable');
            }),
          ),
        );
      });
    });

    await once(server, 'listening');
    const address = server.address() as AddressInfo;
    client = new WsClient(`ws://127.0.0.1:${address.port}`, { timeout: 1000 });
  });

  afterEach(async () => {
    serverFn = undefined;
    await client.close();
    server.close();
    if (!serverClosed) await once(server, 'close');
    vi.useRealTimers();
  });

  it("doesn't spam the reconnect", async () => {
    const response = client.sendRequest(
      'cf_swap_rate',
      { asset: 'USDC', chain: 'Ethereum' },
      { asset: 'FLIP', chain: 'Ethereum' },
      '0x1',
    );
    expect(await response).toEqual({ intermediary: null, output: 1n });

    killConnections();
    closeServer();
    const connectSpy = vi.spyOn(client, 'connect' as any);
    expect(connectSpy).not.toHaveBeenCalled();
    await once(client['emitter'], 'DISCONNECT');

    let resolve!: () => void;
    const sleepMock = vi.mocked(sleep).mockImplementation(() => {
      const deferred = Promise.withResolvers<void>();
      resolve = deferred.resolve;
      return deferred.promise;
    });

    for (let i = 0; i < 7; i += 1) {
      await once(client['emitter'], 'CONNECTING');
      expect(connectSpy).toHaveBeenCalledTimes(i + 1);
      await once(client['emitter'], 'DISCONNECT');
      expect(sleepMock.mock.lastCall?.[0]).toBe(250 * 2 ** i);
      resolve();
    }

    await client.close();

    expect(connectSpy).toHaveBeenCalledTimes(8);
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
    expect(client['ws']).toBeDefined();
    client['ws']?.dispatchEvent(new Event('error'));
    await once(client['emitter'], 'DISCONNECT');
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
    client = new WsClient(client['url'], { timeout: 500 });
    await expect(
      client.sendRequest(
        'cf_swap_rate',
        { asset: 'USDC', chain: 'Ethereum' },
        { asset: 'FLIP', chain: 'Ethereum' },
        '0x1',
      ),
    ).resolves.not.toThrow();

    serverFn = vi.fn();

    const request = client.sendRequest('cf_supported_assets');

    await expect(request).rejects.toThrowError('timeout');

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

  it('serves multiple requests at once', async () => {
    await client['connectionReady']();

    const spy = vi.spyOn(client['ws']!, 'send');

    const accounts = await client.sendRequest('cf_accounts');

    expect(accounts).toEqual([
      ['account 1', ''],
      ['account 2', ''],
    ]);

    expect(await Promise.all(accounts.map(([acct]) => client.sendRequest('cf_account_info', acct))))
      .toMatchInlineSnapshot(`
        [
          {
            "asset_balances": {
              "Arbitrum": {
                "ETH": 0n,
                "USDC": 0n,
              },
              "Assethub": {
                "DOT": 0n,
                "USDC": 0n,
                "USDT": 0n,
              },
              "Bitcoin": {
                "BTC": 0n,
              },
              "Ethereum": {
                "ETH": 0n,
                "FLIP": 0n,
                "USDC": 0n,
                "USDT": 0n,
              },
              "Polkadot": {
                "DOT": 0n,
              },
              "Solana": {
                "SOL": 0n,
                "USDC": 0n,
              },
            },
            "flip_balance": 0n,
            "role": "unregistered",
          },
          {
            "asset_balances": {
              "Arbitrum": {
                "ETH": 0n,
                "USDC": 0n,
              },
              "Assethub": {
                "DOT": 0n,
                "USDC": 0n,
                "USDT": 0n,
              },
              "Bitcoin": {
                "BTC": 0n,
              },
              "Ethereum": {
                "ETH": 0n,
                "FLIP": 0n,
                "USDC": 0n,
                "USDT": 0n,
              },
              "Polkadot": {
                "DOT": 0n,
              },
              "Solana": {
                "SOL": 0n,
                "USDC": 0n,
              },
            },
            "flip_balance": 16n,
            "role": "unregistered",
          },
        ]
      `);

    expect(spy.mock.calls.map((args) => args.map((a) => JSON.parse(a.toString())))).toMatchObject([
      [
        [
          {
            jsonrpc: '2.0',
            id: expect.any(String),
            method: 'cf_accounts',
            params: [],
          },
        ],
      ],
      [
        [
          {
            jsonrpc: '2.0',
            id: expect.any(String),
            method: 'cf_account_info',
            params: ['account 1'],
          },
          {
            jsonrpc: '2.0',
            id: expect.any(String),
            method: 'cf_account_info',
            params: ['account 2'],
          },
        ],
      ],
    ]);
  });

  it('rejects pending requests when the websocket disconnects', async () => {
    await client['connectionReady']();
    const deferred = Promise.withResolvers<any>();
    client['inFlightRequestMap'].set('hello world', deferred);
    await Promise.all([
      expect(deferred.promise).rejects.toThrowError('disconnected'),
      client.close(),
    ]);
  });
});
