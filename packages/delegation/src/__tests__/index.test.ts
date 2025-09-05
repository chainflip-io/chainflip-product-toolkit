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
  const calls: { action: string; args: any }[] = [];

  beforeEach(() => {
    count = 0;
    calls.length = 0;
    walletclient = {
      account: { address: '0xa56A6be23b6Cf39D9448FF6e897C29c41c8fbDFF' },
      writeContract: vi.fn().mockImplementation((args) => {
        calls.push({ action: 'writeContract', args });
        return `tx hash ${count++}`;
      }),
      chain: 'client chain',
    } as unknown as WalletClient;
    publicClient = {
      readContract: vi.fn().mockImplementation((args) => {
        calls.push({ action: 'readContract', args });
        return Promise.resolve();
      }),
      simulateContract: vi.fn().mockImplementation((args) => {
        calls.push({ action: 'simulateContract', args });
        return { request: args };
      }),
      waitForTransactionReceipt: vi.fn().mockImplementation((args) => {
        calls.push({ action: 'waitForTransactionReceipt', args });
      }),
    } as unknown as PublicClient;
  });

  describe(DelegationSDK.prototype.delegateFromBalance, () => {
    it('delegates 10 FLIP', async () => {
      const sdk = new DelegationSDK(walletclient, publicClient, 'backspin');

      expect(
        await sdk.delegateFromBalance(
          'cFMjXCTxTHVkSqbKzeVwJ25TJxLqc1Vn9usPgUGmZhsyvHRQZ',
          BigInt(10e18),
        ),
      ).toEqual('tx hash 0');

      expect(calls).toMatchInlineSnapshot(`
        [
          {
            "action": "simulateContract",
            "args": {
              "abi": "{{ SC UTILS ABI }}",
              "account": {
                "address": "0xa56A6be23b6Cf39D9448FF6e897C29c41c8fbDFF",
              },
              "address": "0xc5a5C42992dECbae36851359345FE25997F5C42d",
              "args": [
                "0x0000aadef2b57f70666b05f95dd3d223bc85df6c03b28d36f8cc2026383d8428af23010000e8890423c78a0000000000000000",
              ],
              "chain": "client chain",
              "functionName": "callSc",
            },
          },
          {
            "action": "writeContract",
            "args": {
              "abi": "{{ SC UTILS ABI }}",
              "account": {
                "address": "0xa56A6be23b6Cf39D9448FF6e897C29c41c8fbDFF",
              },
              "address": "0xc5a5C42992dECbae36851359345FE25997F5C42d",
              "args": [
                "0x0000aadef2b57f70666b05f95dd3d223bc85df6c03b28d36f8cc2026383d8428af23010000e8890423c78a0000000000000000",
              ],
              "chain": "client chain",
              "functionName": "callSc",
            },
          },
          {
            "action": "waitForTransactionReceipt",
            "args": {
              "hash": "tx hash 0",
            },
          },
        ]
      `);
    });

    it('delegates max FLIP', async () => {
      const sdk = new DelegationSDK(walletclient, publicClient, 'backspin');

      expect(
        await sdk.delegateFromBalance('cFMjXCTxTHVkSqbKzeVwJ25TJxLqc1Vn9usPgUGmZhsyvHRQZ'),
      ).toEqual('tx hash 0');

      expect(calls).toMatchInlineSnapshot(`
        [
          {
            "action": "simulateContract",
            "args": {
              "abi": "{{ SC UTILS ABI }}",
              "account": {
                "address": "0xa56A6be23b6Cf39D9448FF6e897C29c41c8fbDFF",
              },
              "address": "0xc5a5C42992dECbae36851359345FE25997F5C42d",
              "args": [
                "0x0000aadef2b57f70666b05f95dd3d223bc85df6c03b28d36f8cc2026383d8428af2300",
              ],
              "chain": "client chain",
              "functionName": "callSc",
            },
          },
          {
            "action": "writeContract",
            "args": {
              "abi": "{{ SC UTILS ABI }}",
              "account": {
                "address": "0xa56A6be23b6Cf39D9448FF6e897C29c41c8fbDFF",
              },
              "address": "0xc5a5C42992dECbae36851359345FE25997F5C42d",
              "args": [
                "0x0000aadef2b57f70666b05f95dd3d223bc85df6c03b28d36f8cc2026383d8428af2300",
              ],
              "chain": "client chain",
              "functionName": "callSc",
            },
          },
          {
            "action": "waitForTransactionReceipt",
            "args": {
              "hash": "tx hash 0",
            },
          },
        ]
      `);
    });
  });

  describe(DelegationSDK.prototype.depositAndDelegate, () => {
    it('deposts 10 FLIP and delegates max', async () => {
      const sdk = new DelegationSDK(walletclient, publicClient, 'backspin');

      expect(
        await sdk.depositAndDelegate(
          'cFMjXCTxTHVkSqbKzeVwJ25TJxLqc1Vn9usPgUGmZhsyvHRQZ',
          BigInt(10e18),
        ),
      ).toEqual('tx hash 0');

      expect(calls).toMatchInlineSnapshot(`
        [
          {
            "action": "simulateContract",
            "args": {
              "abi": "{{ SC UTILS ABI }}",
              "account": {
                "address": "0xa56A6be23b6Cf39D9448FF6e897C29c41c8fbDFF",
              },
              "address": "0xc5a5C42992dECbae36851359345FE25997F5C42d",
              "args": [
                10000000000000000000n,
                "0x0000aadef2b57f70666b05f95dd3d223bc85df6c03b28d36f8cc2026383d8428af2300",
              ],
              "chain": "client chain",
              "functionName": "depositToScGateway",
            },
          },
          {
            "action": "writeContract",
            "args": {
              "abi": "{{ SC UTILS ABI }}",
              "account": {
                "address": "0xa56A6be23b6Cf39D9448FF6e897C29c41c8fbDFF",
              },
              "address": "0xc5a5C42992dECbae36851359345FE25997F5C42d",
              "args": [
                10000000000000000000n,
                "0x0000aadef2b57f70666b05f95dd3d223bc85df6c03b28d36f8cc2026383d8428af2300",
              ],
              "chain": "client chain",
              "functionName": "depositToScGateway",
            },
          },
          {
            "action": "waitForTransactionReceipt",
            "args": {
              "hash": "tx hash 0",
            },
          },
        ]
      `);
    });

    it('deposts 10 FLIP and delegates 20 FLIP', async () => {
      const sdk = new DelegationSDK(walletclient, publicClient, 'backspin');

      expect(
        await sdk.depositAndDelegate(
          'cFMjXCTxTHVkSqbKzeVwJ25TJxLqc1Vn9usPgUGmZhsyvHRQZ',
          BigInt(10e18),
          BigInt(20e18),
        ),
      ).toEqual('tx hash 0');

      expect(calls).toMatchInlineSnapshot(`
        [
          {
            "action": "simulateContract",
            "args": {
              "abi": "{{ SC UTILS ABI }}",
              "account": {
                "address": "0xa56A6be23b6Cf39D9448FF6e897C29c41c8fbDFF",
              },
              "address": "0xc5a5C42992dECbae36851359345FE25997F5C42d",
              "args": [
                10000000000000000000n,
                "0x0000aadef2b57f70666b05f95dd3d223bc85df6c03b28d36f8cc2026383d8428af23010000d01309468e150100000000000000",
              ],
              "chain": "client chain",
              "functionName": "depositToScGateway",
            },
          },
          {
            "action": "writeContract",
            "args": {
              "abi": "{{ SC UTILS ABI }}",
              "account": {
                "address": "0xa56A6be23b6Cf39D9448FF6e897C29c41c8fbDFF",
              },
              "address": "0xc5a5C42992dECbae36851359345FE25997F5C42d",
              "args": [
                10000000000000000000n,
                "0x0000aadef2b57f70666b05f95dd3d223bc85df6c03b28d36f8cc2026383d8428af23010000d01309468e150100000000000000",
              ],
              "chain": "client chain",
              "functionName": "depositToScGateway",
            },
          },
          {
            "action": "waitForTransactionReceipt",
            "args": {
              "hash": "tx hash 0",
            },
          },
        ]
      `);
    });
  });

  describe(DelegationSDK.prototype.undelegate, () => {
    it('undelegates 10 FLIP', async () => {
      const sdk = new DelegationSDK(walletclient, publicClient, 'backspin');

      expect(await sdk.undelegate(BigInt(10e18))).toEqual('tx hash 0');
      expect(calls).toMatchInlineSnapshot(`
        [
          {
            "action": "simulateContract",
            "args": {
              "abi": "{{ SC UTILS ABI }}",
              "account": {
                "address": "0xa56A6be23b6Cf39D9448FF6e897C29c41c8fbDFF",
              },
              "address": "0xc5a5C42992dECbae36851359345FE25997F5C42d",
              "args": [
                "0x0001010000e8890423c78a0000000000000000",
              ],
              "chain": "client chain",
              "functionName": "callSc",
            },
          },
          {
            "action": "writeContract",
            "args": {
              "abi": "{{ SC UTILS ABI }}",
              "account": {
                "address": "0xa56A6be23b6Cf39D9448FF6e897C29c41c8fbDFF",
              },
              "address": "0xc5a5C42992dECbae36851359345FE25997F5C42d",
              "args": [
                "0x0001010000e8890423c78a0000000000000000",
              ],
              "chain": "client chain",
              "functionName": "callSc",
            },
          },
          {
            "action": "waitForTransactionReceipt",
            "args": {
              "hash": "tx hash 0",
            },
          },
        ]
      `);
    });

    it('undelegates max FLIP', async () => {
      const sdk = new DelegationSDK(walletclient, publicClient, 'backspin');

      expect(await sdk.undelegate()).toEqual('tx hash 0');
      expect(calls).toMatchInlineSnapshot(`
        [
          {
            "action": "simulateContract",
            "args": {
              "abi": "{{ SC UTILS ABI }}",
              "account": {
                "address": "0xa56A6be23b6Cf39D9448FF6e897C29c41c8fbDFF",
              },
              "address": "0xc5a5C42992dECbae36851359345FE25997F5C42d",
              "args": [
                "0x000100",
              ],
              "chain": "client chain",
              "functionName": "callSc",
            },
          },
          {
            "action": "writeContract",
            "args": {
              "abi": "{{ SC UTILS ABI }}",
              "account": {
                "address": "0xa56A6be23b6Cf39D9448FF6e897C29c41c8fbDFF",
              },
              "address": "0xc5a5C42992dECbae36851359345FE25997F5C42d",
              "args": [
                "0x000100",
              ],
              "chain": "client chain",
              "functionName": "callSc",
            },
          },
          {
            "action": "waitForTransactionReceipt",
            "args": {
              "hash": "tx hash 0",
            },
          },
        ]
      `);
    });
  });

  describe(DelegationSDK.prototype.redeem, () => {
    it('calls redeem with an amount', async () => {
      const sdk = new DelegationSDK(walletclient, publicClient, 'backspin');

      await sdk.redeem('0xa56A6be23b6Cf39D9448FF6e897C29c41c8fbDFF', BigInt(10e18));

      expect(calls).toMatchInlineSnapshot(`
        [
          {
            "action": "simulateContract",
            "args": {
              "abi": "{{ SC UTILS ABI }}",
              "account": {
                "address": "0xa56A6be23b6Cf39D9448FF6e897C29c41c8fbDFF",
              },
              "address": "0xc5a5C42992dECbae36851359345FE25997F5C42d",
              "args": [
                "0x0002010000e8890423c78a0000000000000000a56a6be23b6cf39d9448ff6e897c29c41c8fbdff00",
              ],
              "chain": "client chain",
              "functionName": "callSc",
            },
          },
          {
            "action": "writeContract",
            "args": {
              "abi": "{{ SC UTILS ABI }}",
              "account": {
                "address": "0xa56A6be23b6Cf39D9448FF6e897C29c41c8fbDFF",
              },
              "address": "0xc5a5C42992dECbae36851359345FE25997F5C42d",
              "args": [
                "0x0002010000e8890423c78a0000000000000000a56a6be23b6cf39d9448ff6e897c29c41c8fbdff00",
              ],
              "chain": "client chain",
              "functionName": "callSc",
            },
          },
          {
            "action": "waitForTransactionReceipt",
            "args": {
              "hash": "tx hash 0",
            },
          },
        ]
      `);
    });

    it('calls redeem without an amount', async () => {
      const sdk = new DelegationSDK(walletclient, publicClient, 'backspin');

      await sdk.redeem('0xa56A6be23b6Cf39D9448FF6e897C29c41c8fbDFF');

      expect(calls).toMatchInlineSnapshot(`
        [
          {
            "action": "simulateContract",
            "args": {
              "abi": "{{ SC UTILS ABI }}",
              "account": {
                "address": "0xa56A6be23b6Cf39D9448FF6e897C29c41c8fbDFF",
              },
              "address": "0xc5a5C42992dECbae36851359345FE25997F5C42d",
              "args": [
                "0x000200a56a6be23b6cf39d9448ff6e897c29c41c8fbdff00",
              ],
              "chain": "client chain",
              "functionName": "callSc",
            },
          },
          {
            "action": "writeContract",
            "args": {
              "abi": "{{ SC UTILS ABI }}",
              "account": {
                "address": "0xa56A6be23b6Cf39D9448FF6e897C29c41c8fbDFF",
              },
              "address": "0xc5a5C42992dECbae36851359345FE25997F5C42d",
              "args": [
                "0x000200a56a6be23b6cf39d9448ff6e897c29c41c8fbdff00",
              ],
              "chain": "client chain",
              "functionName": "callSc",
            },
          },
          {
            "action": "waitForTransactionReceipt",
            "args": {
              "hash": "tx hash 0",
            },
          },
        ]
      `);
    });
  });

  describe(DelegationSDK.prototype.approveScUtils, () => {
    it('approves the SC utils if necessary', async () => {
      const sdk = new DelegationSDK(walletclient, publicClient, 'backspin');

      vi.mocked(publicClient.readContract).mockImplementationOnce((args) => {
        calls.push({ action: 'readContract', args });
        return Promise.resolve(BigInt(2.5e18));
      });

      expect(await sdk.approveScUtils(BigInt(10e18))).toEqual('tx hash 0');
      expect(calls).toMatchInlineSnapshot(`
        [
          {
            "action": "readContract",
            "args": {
              "abi": "{{ ERC20 ABI }}",
              "address": "0x10C6E9530F1C1AF873a391030a1D9E8ed0630D26",
              "args": [
                "0xa56A6be23b6Cf39D9448FF6e897C29c41c8fbDFF",
                "0xc5a5C42992dECbae36851359345FE25997F5C42d",
              ],
              "functionName": "allowance",
            },
          },
          {
            "action": "simulateContract",
            "args": {
              "abi": "{{ ERC20 ABI }}",
              "account": {
                "address": "0xa56A6be23b6Cf39D9448FF6e897C29c41c8fbDFF",
              },
              "address": "0x10C6E9530F1C1AF873a391030a1D9E8ed0630D26",
              "args": [
                "0xc5a5C42992dECbae36851359345FE25997F5C42d",
                7500000000000000000n,
              ],
              "chain": "client chain",
              "functionName": "approve",
            },
          },
          {
            "action": "writeContract",
            "args": {
              "abi": "{{ ERC20 ABI }}",
              "account": {
                "address": "0xa56A6be23b6Cf39D9448FF6e897C29c41c8fbDFF",
              },
              "address": "0x10C6E9530F1C1AF873a391030a1D9E8ed0630D26",
              "args": [
                "0xc5a5C42992dECbae36851359345FE25997F5C42d",
                7500000000000000000n,
              ],
              "chain": "client chain",
              "functionName": "approve",
            },
          },
          {
            "action": "waitForTransactionReceipt",
            "args": {
              "hash": "tx hash 0",
            },
          },
        ]
      `);
    });

    it('does nothing if the allowance is high enough', async () => {
      const sdk = new DelegationSDK(walletclient, publicClient, 'backspin');

      vi.mocked(publicClient.readContract).mockImplementationOnce((args) => {
        calls.push({ action: 'readContract', args });
        return Promise.resolve(BigInt(10e18));
      });

      expect(await sdk.approveScUtils(BigInt(10e18))).toBeNull();
      expect(calls).toMatchInlineSnapshot(`
        [
          {
            "action": "readContract",
            "args": {
              "abi": "{{ ERC20 ABI }}",
              "address": "0x10C6E9530F1C1AF873a391030a1D9E8ed0630D26",
              "args": [
                "0xa56A6be23b6Cf39D9448FF6e897C29c41c8fbDFF",
                "0xc5a5C42992dECbae36851359345FE25997F5C42d",
              ],
              "functionName": "allowance",
            },
          },
        ]
      `);
    });
  });
});
