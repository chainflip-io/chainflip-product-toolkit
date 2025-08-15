import { describe, expect, it } from 'vitest';
import { serializeDelegationCall } from '../scale.js';

describe(serializeDelegationCall, () => {
  it('builds the Delegate call data', () => {
    expect(
      serializeDelegationCall({
        call: 'delegate',
        operator: 'cFMjXCTxTHVkSqbKzeVwJ25TJxLqc1Vn9usPgUGmZhsyvHRQZ',
      }),
    ).toStrictEqual('0x0000aadef2b57f70666b05f95dd3d223bc85df6c03b28d36f8cc2026383d8428af23');
  });

  it('builds the Undelegate call data', () => {
    expect(serializeDelegationCall({ call: 'undelegate' })).toStrictEqual('0x0001');
  });

  it('builds the SetMaxBid call data with a max bid', () => {
    expect(serializeDelegationCall({ call: 'setMaxBid', maxBid: BigInt(10e18) })).toStrictEqual(
      '0x0002010000e8890423c78a0000000000000000',
    );
  });

  it('builds the SetMaxBid call data without a max bid', () => {
    expect(serializeDelegationCall({ call: 'setMaxBid' })).toStrictEqual('0x000200');
  });

  it('throws for unsupported call types', () => {
    expect(() =>
      serializeDelegationCall({
        // @ts-expect-error type doesn't exist
        call: 'unsupported',
      }),
    ).toThrow('Unsupported call type');
  });
});
