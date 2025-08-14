import { assert } from '@chainflip/utils/assertion';
import { bytesToHex } from '@chainflip/utils/bytes';
import { CHAINFLIP_SS58_PREFIX } from '@chainflip/utils/consts';
import * as ss58 from '@chainflip/utils/ss58';
import { DelegationApi } from './codecs';

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

type CallData =
  | { type: 'delegate'; operator: `cF${string}` }
  | { type: 'undelegate' }
  | { type: 'setMaxBid'; maybeMaxBid?: bigint | undefined };

export const buildCallData = (data: CallData): `0x${string}` => {
  switch (data.type) {
    case 'delegate':
      return bytesToHex(
        DelegationApi.enc({
          tag: 'Delegate',
          value: { operator: ss58.decode(data.operator).data },
        }),
      );
    case 'undelegate':
      return bytesToHex(DelegationApi.enc({ tag: 'Undelegate', value: undefined }));
    case 'setMaxBid':
      return bytesToHex(
        DelegationApi.enc({ tag: 'SetMaxBid', value: { maybeMaxBid: data.maybeMaxBid } }),
      );
  }
};
