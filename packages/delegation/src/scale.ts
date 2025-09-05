import { unreachable } from '@chainflip/utils/assertion';
import { bytesToHex, hexToBytes } from '@chainflip/utils/bytes';
import * as ss58 from '@chainflip/utils/ss58';
import { _void, Bytes, CodecType, Enum, Option, Struct, u128 } from 'scale-ts';

const DelegationAmount = Enum({
  Max: _void,
  Some: u128,
});

const DelegationApi = Enum({
  Delegate: Struct({
    operator: Bytes(32),
    increase: DelegationAmount,
  }),
  Undelegate: Struct({
    decrease: DelegationAmount,
  }),
  Redeem: Struct({
    amount: Enum({ Max: _void, Exact: u128 }),
    address: Bytes(20),
    executor: Option(Bytes(20)),
  }),
});

export const EthereumSCApi = Enum({
  Delegation: DelegationApi,
});

export type CallData =
  | { call: 'delegate'; operator: `cF${string}`; increaseBy: bigint | undefined }
  | { call: 'undelegate'; decreaseBy: bigint | undefined }
  | {
      call: 'redeem';
      /** The amount to redeem, if `undefined`, all available FLIP will be redeemed */
      amount?: bigint | undefined;
      address: `0x${string}`;
    };

const buildDelegationAmount = (amount: bigint | undefined) =>
  amount ? ({ tag: 'Some', value: amount } as const) : ({ tag: 'Max', value: undefined } as const);

const buildDelegationApiData = (data: CallData): CodecType<typeof DelegationApi> => {
  switch (data.call) {
    case 'delegate':
      return {
        tag: 'Delegate',
        value: {
          operator: ss58.decode(data.operator).data,
          increase: buildDelegationAmount(data.increaseBy),
        },
      } as const;
    case 'undelegate':
      return {
        tag: 'Undelegate',
        value: { decrease: buildDelegationAmount(data.decreaseBy) },
      } as const;
    case 'redeem':
      return {
        tag: 'Redeem',
        value: {
          amount:
            data.amount === undefined
              ? { tag: 'Max', value: undefined }
              : { tag: 'Exact', value: data.amount },
          address: hexToBytes(data.address),
          // The executor field is always set to undefined because executor functionality is not currently supported.
          executor: undefined,
        },
      };
    default:
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return unreachable(data, `Unsupported call type: ${(data as any)?.type}`);
  }
};

export const serializeDelegationCall = (data: CallData): `0x${string}` =>
  bytesToHex(EthereumSCApi.enc({ tag: 'Delegation', value: buildDelegationApiData(data) }));
