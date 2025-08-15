import { unreachable } from '@chainflip/utils/assertion';
import { bytesToHex } from '@chainflip/utils/bytes';
import * as ss58 from '@chainflip/utils/ss58';
import { _void, Bytes, CodecType, Enum, Option, Struct, u128 } from 'scale-ts';

const DelegationApi = Enum({
  Delegate: Struct({
    operator: Bytes(32),
  }),
  Undelegate: _void,
  SetMaxBid: Struct({
    maybeMaxBid: Option(u128),
  }),
});

export const EthereumSCApi = Enum({
  Delegation: DelegationApi,
});

type CallData =
  | { call: 'delegate'; operator: `cF${string}` }
  | { call: 'undelegate' }
  | {
      call: 'setMaxBid';
      /** The new max bid, if set to `undefined`, it will be */
      maxBid?: bigint | undefined;
    };

const buildDelegationApiData = (data: CallData): CodecType<typeof DelegationApi> => {
  switch (data.call) {
    case 'delegate':
      return {
        tag: 'Delegate',
        value: { operator: ss58.decode(data.operator).data },
      } as const;
    case 'undelegate':
      return { tag: 'Undelegate', value: undefined } as const;
    case 'setMaxBid':
      return { tag: 'SetMaxBid', value: { maybeMaxBid: data.maxBid } } as const;
    default:
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return unreachable(data, `Unsupported call type: ${(data as any)?.type}`);
  }
};

export const serializeDelegationCall = (data: CallData): `0x${string}` =>
  bytesToHex(EthereumSCApi.enc({ tag: 'Delegation', value: buildDelegationApiData(data) }));
