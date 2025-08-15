import { _void, Bytes, Enum, Struct, u128, Option } from 'scale-ts';

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
