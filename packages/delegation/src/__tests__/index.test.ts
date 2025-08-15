import * as ss58 from '@chainflip/utils/ss58';
import { describe, expect, it } from 'vitest';
import { accountIdToEthereumAddress, buildCallData, ethereumAddressToAccountId } from '../index.js';

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

describe(buildCallData, () => {
  it('builds the Delegate call data', () => {
    expect(
      buildCallData({
        type: 'delegate',
        operator: 'cFMjXCTxTHVkSqbKzeVwJ25TJxLqc1Vn9usPgUGmZhsyvHRQZ',
      }),
    ).toStrictEqual('0x0000aadef2b57f70666b05f95dd3d223bc85df6c03b28d36f8cc2026383d8428af23');
  });

  it('builds the Undelegate call data', () => {
    expect(buildCallData({ type: 'undelegate' })).toStrictEqual('0x0001');
  });

  it('builds the SetMaxBid call data with a max bid', () => {
    expect(buildCallData({ type: 'setMaxBid', maybeMaxBid: BigInt(10e18) })).toStrictEqual(
      '0x0002010000e8890423c78a0000000000000000',
    );
  });

  it('builds the SetMaxBid call data without a max bid', () => {
    expect(buildCallData({ type: 'setMaxBid' })).toStrictEqual('0x000200');
  });

  it('throws for unsupported call types', () => {
    expect(() =>
      buildCallData({
        // @ts-expect-error type doesn't exist
        type: 'unsupported',
      }),
    ).toThrow('Unsupported call type');
  });
});
