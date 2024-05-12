import { once } from 'events';
import { AddressInfo, WebSocket, WebSocketServer } from 'ws';
import WsClient from './WsClient.ts';

declare global {
  interface Error {
    id(): number;
  }
}

(function () {
  var id = 0;

  const generateId = () => id++;

  Error.prototype.id = function () {
    var newId = generateId();

    this.id = function () {
      return newId;
    };

    return newId;
  };
})();

const server = new WebSocketServer({ port: 0, host: '127.0.0.1' });

const killConnections = () => {
  server.clients.forEach((c) => {
    c.terminate();
  });
};

server.on('connection', (ws) => {
  ws.on('message', (data) => {
    const rpcRequest = JSON.parse(data.toString());

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

const ws = new WsClient(
  `ws://127.0.0.1:${address.port}`,
  WebSocket as unknown as typeof globalThis.WebSocket,
);

process.on('unhandledRejection', (err) => {
  if (err instanceof Error) {
    console.error('unhandled rejection:', err.id());
  }
});

console.log(
  await ws.sendRequest('cf_swap_rate', [
    { asset: 'USDC', chain: 'Ethereum' },
    { asset: 'ETH', chain: 'Ethereum' },
    `0x${(1e6).toString(16)}`,
  ]),
);

killConnections();

console.log(
  await ws.sendRequest('cf_swap_rate', [
    { asset: 'USDC', chain: 'Ethereum' },
    { asset: 'ETH', chain: 'Ethereum' },
    `0x${(1e6).toString(16)}`,
  ]),
);

await ws.close();
server.close();
