import { assert } from '@chainflip/utils/assertion';
import { bytesToHex } from '@chainflip/utils/bytes';
import { ChainflipNetwork } from '@chainflip/utils/chainflip';
import { CHAINFLIP_SS58_PREFIX } from '@chainflip/utils/consts';
import * as ss58 from '@chainflip/utils/ss58';
import { erc20Abi, type PublicClient, type WalletClient } from 'viem';
import { scUtils } from './abis';
import { FLIP_ADDRESSES, SC_UTILS_ADDRESSES } from './constants';
import { CallData, serializeDelegationCall } from './scale';

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
    private readonly walletClient: WalletClient,
    private readonly publicClient: PublicClient,
    private readonly network: ChainflipNetwork,
    private readonly options?: { rpcUrl?: string },
  ) {}

  /** this will be replaced with an RPC call */
  // eslint-disable-next-line @typescript-eslint/require-await
  private async encodeScBytes(data: CallData) {
    return serializeDelegationCall(data);
  }

  private getAccount() {
    const { account } = this.walletClient;

    assert(account !== undefined, 'no account provided for delegation call');

    return account;
  }

  async approveScUtils(requiredAmount: bigint): Promise<`0x${string}` | null> {
    const scUtilsAddress = SC_UTILS_ADDRESSES[this.network];
    const flipAddress = FLIP_ADDRESSES[this.network];
    const account = this.getAccount();

    const currentAllowance = await this.publicClient.readContract({
      abi: erc20Abi,
      functionName: 'allowance',
      args: [account.address, scUtilsAddress],
      address: flipAddress,
    });

    if (currentAllowance >= requiredAmount) return null;

    const { request } = await this.publicClient.simulateContract({
      abi: erc20Abi,
      functionName: 'approve',
      args: [scUtilsAddress, requiredAmount - currentAllowance],
      account,
      chain: this.walletClient.chain,
      address: flipAddress,
    });

    const hash = await this.walletClient.writeContract(request);

    await this.publicClient.waitForTransactionReceipt({ hash });

    return hash;
  }

  async depositAndDelegate(
    operator: `cF${string}`,
    depositAmount: bigint,
    increaseBy?: bigint,
  ): Promise<`0x${string}`> {
    const { request } = await this.publicClient.simulateContract({
      address: SC_UTILS_ADDRESSES[this.network],
      abi: scUtils,
      functionName: 'depositToScGateway',
      args: [depositAmount, await this.encodeScBytes({ call: 'delegate', operator, increaseBy })],
      chain: this.walletClient.chain,
      account: this.getAccount(),
    });

    const hash = await this.walletClient.writeContract(request);

    await this.publicClient.waitForTransactionReceipt({ hash });

    return hash;
  }

  private async executeCallSc(data: CallData): Promise<`0x${string}`> {
    const { request } = await this.publicClient.simulateContract({
      address: SC_UTILS_ADDRESSES[this.network],
      abi: scUtils,
      functionName: 'callSc',
      args: [await this.encodeScBytes(data)],
      chain: this.walletClient.chain,
      account: this.getAccount(),
    });

    const hash = await this.walletClient.writeContract(request);

    await this.publicClient.waitForTransactionReceipt({ hash });

    return hash;
  }

  async delegateFromBalance(operator: `cF${string}`, increaseBy?: bigint): Promise<`0x${string}`> {
    return this.executeCallSc({ call: 'delegate', operator, increaseBy });
  }

  undelegate(decreaseBy?: bigint): Promise<`0x${string}`> {
    return this.executeCallSc({ call: 'undelegate', decreaseBy });
  }

  redeem(address: `0x${string}`, amount?: bigint): Promise<`0x${string}`> {
    return this.executeCallSc({ call: 'redeem', address, amount });
  }
}
