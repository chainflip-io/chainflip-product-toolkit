import { assert } from '@chainflip/utils/assertion';
import { bytesToHex } from '@chainflip/utils/bytes';
import { ChainflipNetwork } from '@chainflip/utils/chainflip';
import { CHAINFLIP_SS58_PREFIX } from '@chainflip/utils/consts';
import * as ss58 from '@chainflip/utils/ss58';
import type { Account, WalletClient } from 'viem';
import { scUtils } from './abis';
import { SC_UTILS_ADDRESS } from './constants';
import { serializeDelegationCall } from './scale';

export const ethereumAddressToAccountId = (address: `0x${string}`): `cF${string}` => {
  assert(address.startsWith('0x') && address.length === 42, 'Invalid Ethereum address format');

  return ss58.encode({
    data: `0x000000000000000000000000${address.slice(2)}`,
    ss58Format: CHAINFLIP_SS58_PREFIX,
  }) as `cF${string}`;
};

export const accountIdToEthereumAddress = (accountId: `cF${string}`): `0x${string}` => {
  const decoded = ss58.decode(accountId);
  assert(decoded.ss58Format === CHAINFLIP_SS58_PREFIX, 'Invalid Chainflip account ID format');
  assert(
    decoded.data.slice(0, -20).every((byte) => byte === 0),
    'Invalid Chainflip account ID data',
  );
  return bytesToHex(decoded.data.slice(-20));
};

export class DelegationSDK {
  constructor(
    private readonly client: WalletClient,
    private readonly network: ChainflipNetwork,
    private readonly options?: { rpcUrl?: string },
  ) {}

  /** this will be replaced with an RPC call */
  // eslint-disable-next-line @typescript-eslint/require-await
  private async encodeScBytes(data: Parameters<typeof serializeDelegationCall>[0]) {
    return serializeDelegationCall(data);
  }

  private async withAccount<T>(cb: (account: Account) => Promise<T>): Promise<T> {
    const { account } = this.client;

    assert(account !== undefined, 'no account provided for delegation call');

    return cb(account);
  }

  async delegate(amount: bigint, operator: `cF${string}`): Promise<`0x${string}`> {
    return this.withAccount(async (account) =>
      this.client.writeContract({
        address: SC_UTILS_ADDRESS[this.network],
        abi: scUtils,
        functionName: 'depositToScGateway',
        args: [amount, await this.encodeScBytes({ call: 'delegate', operator })],
        chain: this.client.chain,
        account,
      }),
    );
  }

  async undelegate(): Promise<`0x${string}`> {
    return this.withAccount(async (account) =>
      this.client.writeContract({
        address: SC_UTILS_ADDRESS[this.network],
        abi: scUtils,
        functionName: 'callSc',
        args: [await this.encodeScBytes({ call: 'undelegate' })],
        chain: this.client.chain,
        account,
      }),
    );
  }

  async setMaxBid(maxBid?: bigint): Promise<`0x${string}`> {
    return this.withAccount(async (account) =>
      this.client.writeContract({
        address: SC_UTILS_ADDRESS[this.network],
        abi: scUtils,
        functionName: 'callSc',
        args: [await this.encodeScBytes({ call: 'setMaxBid', maxBid })],
        chain: this.client.chain,
        account,
      }),
    );
  }
}
