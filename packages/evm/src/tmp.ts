/* eslint-disable no-console */
import { ethereumAddressToAccountId } from '@chainflip/delegation';
import { bytesToHex } from '@chainflip/utils/bytes';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { privateKeyToAccount } from 'viem/accounts';

const withApi = async (fn: (api: ApiPromise) => Promise<void>) => {
  const api = await ApiPromise.create({
    provider: new WsProvider('ws://localhost:9944'),
    noInitWarn: true,
  });

  await fn(api).catch((err) => {
    console.error(err);
  });

  await api.disconnect();
};

const account = privateKeyToAccount(
  '0x03c1d8726ded50e908162ff5dcda3286e9327541d2d1a93f8849e9a3f756ff6a',
);

await withApi(async (api) => {
  const accountId = ethereumAddressToAccountId('0x26A863209E9021E835C9Ab0A657dDC8A659C5aDB');

  const role = (await api.query.accountRoles.accountRoles(accountId)).toString();

  let call;

  if (role === 'Unregistered') {
    console.log('Account is unregistered');
    call = api.tx.validator.registerAsOperator(
      { feeBps: 2000, delegationAcceptance: 'Allow' },
      'TestOperator',
    );
  } else if (role === 'Operator') {
    console.log('Account is operator');
    call = api.tx.validator.deregisterAsOperator();
  } else {
    throw new Error(`Account has unexpected role: ${role}`);
  }

  const nonce = (await api.rpc.system.accountNextIndex(accountId)).toNumber();
  const hexRuntimeCall = bytesToHex(api.createType('Call', call.method).toU8a());

  const data = await api.rpc('cf_encode_non_native_call', hexRuntimeCall, {
    nonce,
    expiry_block: 10_000,
  });

  const result = {
    Eip712: {
      domain: { name: 'Chainflip-Development', version: '0' },
      types: {
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
        ],
        Metadata: [
          { name: 'nonce', type: 'uint32' },
          { name: 'expiryBlock', type: 'uint32' },
        ],
        RuntimeCall: [{ name: 'value', type: 'bytes' }],
        Transaction: [
          { name: 'call', type: 'RuntimeCall' },
          { name: 'metadata', type: 'Metadata' },
        ],
      },
      primaryType: 'Transaction',
      message: {
        call: { value: '0x0910d00700000030546573744f70657261746f72' },
        metadata: { expiryBlock: '10000', nonce: '0' },
      },
    },
  };
});
