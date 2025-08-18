import * as ss58 from '@chainflip/utils/ss58';
import { type PublicClient, type WalletClient } from 'viem';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { accountIdToEthereumAddress, DelegationSDK, ethereumAddressToAccountId } from '../index.js';

vi.mock('../abis.js', () => ({
  scUtils: `{{ SC UTILS ABI }}`,
}));

vi.mock('viem', () => ({
  erc20Abi: '{{ ERC20 ABI }}',
}));

describe(ethereumAddressToAccountId, () => {
  it('converts an Ethereum address to a Chainflip account ID', () => {
    expect(ethereumAddressToAccountId('0xa56A6be23b6Cf39D9448FF6e897C29c41c8fbDFF')).toStrictEqual(
      'cFHsUq1uK5opJudRDd1UXLSfjXF66HtznGkvPztrot3xVkHsj',
    );
  });

  it('throws an error for invalid Ethereum address format', () => {
    expect(() => ethereumAddressToAccountId('0x123')).toThrow('Invalid Ethereum address format');
    expect(() =>
      ethereumAddressToAccountId('1234567890123456789012345678901234567890' as any),
    ).toThrow('Invalid Ethereum address format');
  });
});

describe(accountIdToEthereumAddress, () => {
  it('converts a Chainflip account ID to an Ethereum address', () => {
    expect(
      accountIdToEthereumAddress('cFHsUq1uK5opJudRDd1UXLSfjXF66HtznGkvPztrot3xVkHsj'),
    ).toStrictEqual('0xa56a6be23b6cf39d9448ff6e897c29c41c8fbdff');
  });

  it('throws an error for invalid Chainflip account ID format', () => {
    expect(() =>
      accountIdToEthereumAddress(
        ss58.encode({
          data: ss58.decode('cFHsUq1uK5opJudRDd1UXLSfjXF66HtznGkvPztrot3xVkHsj').data,
          ss58Format: 0,
        }) as any,
      ),
    ).toThrow('Invalid Chainflip account ID format');
    expect(() =>
      accountIdToEthereumAddress('cFNQSLLpijT1XbFaiyhAu8jKhG232r6t8ZDxN1JxWXmgKrkmw'),
    ).toThrow('Invalid Chainflip account ID data');
  });
});

describe(DelegationSDK, () => {
  let walletclient: WalletClient;
  let publicClient: PublicClient;
  let count = 0;
  const calls: any[] = [];

  beforeEach(() => {
    count = 0;
    calls.length = 0;
    walletclient = {
      account: `0xa56A6be23b6Cf39D9448FF6e897C29c41c8fbDFF`,
      writeContract: vi.fn().mockImplementation((args) => {
        calls.push({ type: 'writeContract', args });
        return `tx hash ${count++}`;
      }),
      chain: 'client chain',
    } as unknown as WalletClient;
    publicClient = {
      readContract: vi.fn().mockImplementation((args) => {
        calls.push({ type: 'readContract', args });
        return Promise.resolve();
      }),
      simulateContract: vi.fn().mockImplementation((args) => {
        calls.push({ type: 'simulateContract', args });
        return { request: args };
      }),
      waitForTransactionReceipt: vi.fn().mockImplementation((args) => {
        calls.push({ type: 'waitForTransactionReceipt', args });
      }),
    } as unknown as PublicClient;
  });

  describe(DelegationSDK.prototype.delegate, () => {
    it('delegates FLIP with approval', async () => {
      const sdk = new DelegationSDK(walletclient, publicClient, 'backspin');

      vi.mocked(publicClient.readContract).mockImplementationOnce((args) => {
        calls.push({ type: 'readContract', args });
        return Promise.resolve(BigInt(2.5e18));
      });

      expect(
        await sdk.delegate(BigInt(10e18), 'cFMjXCTxTHVkSqbKzeVwJ25TJxLqc1Vn9usPgUGmZhsyvHRQZ'),
      ).toEqual('tx hash 1');

      expect(calls).toMatchInlineSnapshot(`
        [
          {
            "args": {
              "abi": "{{ ERC20 ABI }}",
              "address": "0x10C6E9530F1C1AF873a391030a1D9E8ed0630D26",
              "args": [
                undefined,
                "0xc5a5C42992dECbae36851359345FE25997F5C42d",
              ],
              "functionName": "allowance",
            },
            "type": "readContract",
          },
          {
            "args": {
              "abi": "{{ ERC20 ABI }}",
              "account": "0xa56A6be23b6Cf39D9448FF6e897C29c41c8fbDFF",
              "address": "0x10C6E9530F1C1AF873a391030a1D9E8ed0630D26",
              "args": [
                "0xc5a5C42992dECbae36851359345FE25997F5C42d",
                7500000000000000000n,
              ],
              "chain": "client chain",
              "functionName": "approve",
            },
            "type": "writeContract",
          },
          {
            "args": {
              "hash": "tx hash 0",
            },
            "type": "waitForTransactionReceipt",
          },
          {
            "args": {
              "abi": "{{ SC UTILS ABI }}",
              "account": "0xa56A6be23b6Cf39D9448FF6e897C29c41c8fbDFF",
              "address": "0xc5a5C42992dECbae36851359345FE25997F5C42d",
              "args": [
                10000000000000000000n,
                "0x0000aadef2b57f70666b05f95dd3d223bc85df6c03b28d36f8cc2026383d8428af23",
              ],
              "chain": "client chain",
              "functionName": "depositToScGateway",
            },
            "type": "simulateContract",
          },
          {
            "args": {
              "abi": "{{ SC UTILS ABI }}",
              "account": "0xa56A6be23b6Cf39D9448FF6e897C29c41c8fbDFF",
              "address": "0xc5a5C42992dECbae36851359345FE25997F5C42d",
              "args": [
                10000000000000000000n,
                "0x0000aadef2b57f70666b05f95dd3d223bc85df6c03b28d36f8cc2026383d8428af23",
              ],
              "chain": "client chain",
              "functionName": "depositToScGateway",
            },
            "type": "writeContract",
          },
          {
            "args": {
              "hash": "tx hash 1",
            },
            "type": "waitForTransactionReceipt",
          },
        ]
      `);
    });

    it('delegates FLIP without approval', async () => {
      const sdk = new DelegationSDK(walletclient, publicClient, 'backspin');

      vi.mocked(publicClient.readContract).mockImplementationOnce((args) => {
        calls.push({ type: 'readContract', args });
        return Promise.resolve(BigInt(10e18));
      });

      expect(
        await sdk.delegate(BigInt(10e18), 'cFMjXCTxTHVkSqbKzeVwJ25TJxLqc1Vn9usPgUGmZhsyvHRQZ'),
      ).toEqual('tx hash 0');

      expect(calls).toMatchInlineSnapshot(`
        [
          {
            "args": {
              "abi": "{{ ERC20 ABI }}",
              "address": "0x10C6E9530F1C1AF873a391030a1D9E8ed0630D26",
              "args": [
                undefined,
                "0xc5a5C42992dECbae36851359345FE25997F5C42d",
              ],
              "functionName": "allowance",
            },
            "type": "readContract",
          },
          {
            "args": {
              "abi": "{{ SC UTILS ABI }}",
              "account": "0xa56A6be23b6Cf39D9448FF6e897C29c41c8fbDFF",
              "address": "0xc5a5C42992dECbae36851359345FE25997F5C42d",
              "args": [
                10000000000000000000n,
                "0x0000aadef2b57f70666b05f95dd3d223bc85df6c03b28d36f8cc2026383d8428af23",
              ],
              "chain": "client chain",
              "functionName": "depositToScGateway",
            },
            "type": "simulateContract",
          },
          {
            "args": {
              "abi": "{{ SC UTILS ABI }}",
              "account": "0xa56A6be23b6Cf39D9448FF6e897C29c41c8fbDFF",
              "address": "0xc5a5C42992dECbae36851359345FE25997F5C42d",
              "args": [
                10000000000000000000n,
                "0x0000aadef2b57f70666b05f95dd3d223bc85df6c03b28d36f8cc2026383d8428af23",
              ],
              "chain": "client chain",
              "functionName": "depositToScGateway",
            },
            "type": "writeContract",
          },
          {
            "args": {
              "hash": "tx hash 0",
            },
            "type": "waitForTransactionReceipt",
          },
        ]
      `);
    });
  });

  describe(DelegationSDK.prototype.undelegate, () => {
    it('undelegates', async () => {
      const sdk = new DelegationSDK(walletclient, publicClient, 'backspin');

      expect(await sdk.undelegate()).toEqual('tx hash 0');
      expect(calls).toMatchInlineSnapshot(`
        [
          {
            "args": {
              "abi": "{{ SC UTILS ABI }}",
              "account": "0xa56A6be23b6Cf39D9448FF6e897C29c41c8fbDFF",
              "address": "0xc5a5C42992dECbae36851359345FE25997F5C42d",
              "args": [
                "0x0001",
              ],
              "chain": "client chain",
              "functionName": "callSc",
            },
            "type": "simulateContract",
          },
          {
            "args": {
              "abi": "{{ SC UTILS ABI }}",
              "account": "0xa56A6be23b6Cf39D9448FF6e897C29c41c8fbDFF",
              "address": "0xc5a5C42992dECbae36851359345FE25997F5C42d",
              "args": [
                "0x0001",
              ],
              "chain": "client chain",
              "functionName": "callSc",
            },
            "type": "writeContract",
          },
          {
            "args": {
              "hash": "tx hash 0",
            },
            "type": "waitForTransactionReceipt",
          },
        ]
      `);
    });
  });

  describe(DelegationSDK.prototype.setMaxBid, () => {
    it('sets the max bid to the provided value', async () => {
      const sdk = new DelegationSDK(walletclient, publicClient, 'backspin');

      expect(await sdk.setMaxBid(BigInt(10e18))).toEqual('tx hash 0');
      expect(calls).toMatchInlineSnapshot(`
        [
          {
            "args": {
              "abi": "{{ SC UTILS ABI }}",
              "account": "0xa56A6be23b6Cf39D9448FF6e897C29c41c8fbDFF",
              "address": "0xc5a5C42992dECbae36851359345FE25997F5C42d",
              "args": [
                "0x0002010000e8890423c78a0000000000000000",
              ],
              "chain": "client chain",
              "functionName": "callSc",
            },
            "type": "simulateContract",
          },
          {
            "args": {
              "abi": "{{ SC UTILS ABI }}",
              "account": "0xa56A6be23b6Cf39D9448FF6e897C29c41c8fbDFF",
              "address": "0xc5a5C42992dECbae36851359345FE25997F5C42d",
              "args": [
                "0x0002010000e8890423c78a0000000000000000",
              ],
              "chain": "client chain",
              "functionName": "callSc",
            },
            "type": "writeContract",
          },
          {
            "args": {
              "hash": "tx hash 0",
            },
            "type": "waitForTransactionReceipt",
          },
        ]
      `);
    });

    it('sets the max bid with no amount', async () => {
      const sdk = new DelegationSDK(walletclient, publicClient, 'backspin');

      expect(await sdk.setMaxBid()).toEqual('tx hash 0');
      expect(calls).toMatchInlineSnapshot(`
        [
          {
            "args": {
              "abi": "{{ SC UTILS ABI }}",
              "account": "0xa56A6be23b6Cf39D9448FF6e897C29c41c8fbDFF",
              "address": "0xc5a5C42992dECbae36851359345FE25997F5C42d",
              "args": [
                "0x000200",
              ],
              "chain": "client chain",
              "functionName": "callSc",
            },
            "type": "simulateContract",
          },
          {
            "args": {
              "abi": "{{ SC UTILS ABI }}",
              "account": "0xa56A6be23b6Cf39D9448FF6e897C29c41c8fbDFF",
              "address": "0xc5a5C42992dECbae36851359345FE25997F5C42d",
              "args": [
                "0x000200",
              ],
              "chain": "client chain",
              "functionName": "callSc",
            },
            "type": "writeContract",
          },
          {
            "args": {
              "hash": "tx hash 0",
            },
            "type": "waitForTransactionReceipt",
          },
        ]
      `);
    });
  });
});
