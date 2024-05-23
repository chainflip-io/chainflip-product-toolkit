import { describe, expect, it } from 'vitest';
import { decode, encode } from '../ss58';

describe(decode, () => {
  it('decodes base58 with format 42', () => {
    expect(decode('5HBGn6aYFhppQhTvyFS8TtUGdGQ5cPjPQKSTYUQQL5FCqYPL')).toEqual({
      ss58Format: 42,
      data: Uint8Array.from([
        226, 47, 118, 86, 8, 174, 224, 18, 43, 196, 204, 146, 208, 121, 50, 8, 215, 86, 147, 143,
        182, 195, 117, 239, 130, 15, 45, 183, 39, 159, 150, 5,
      ]),
    });
  });

  it('decodes base58 with format 2112', () => {
    expect(decode('cFNyy169p7yCy3F9p4bb7mW27Tse3F1v8hw8yTv21Qzwq23xW')).toEqual({
      ss58Format: 2112,
      data: new Uint8Array([
        226, 31, 123, 17, 243, 93, 124, 107, 56, 21, 100, 185, 29, 176, 230, 92, 36, 192, 104, 11,
        252, 112, 126, 10, 48, 130, 68, 112, 65, 56, 17, 111,
      ]),
    });
  });
});

describe(encode, () => {
  it('encodes base58 with format 42', () => {
    expect(
      encode({
        ss58Format: 42,
        data: Uint8Array.from([
          226, 47, 118, 86, 8, 174, 224, 18, 43, 196, 204, 146, 208, 121, 50, 8, 215, 86, 147, 143,
          182, 195, 117, 239, 130, 15, 45, 183, 39, 159, 150, 5,
        ]),
      }),
    ).toEqual('5HBGn6aYFhppQhTvyFS8TtUGdGQ5cPjPQKSTYUQQL5FCqYPL');
  });

  it('encodes base58 with format 2112', () => {
    expect(
      encode({
        ss58Format: 2112,
        data: new Uint8Array([
          226, 31, 123, 17, 243, 93, 124, 107, 56, 21, 100, 185, 29, 176, 230, 92, 36, 192, 104, 11,
          252, 112, 126, 10, 48, 130, 68, 112, 65, 56, 17, 111,
        ]),
      }),
    ).toEqual('cFNyy169p7yCy3F9p4bb7mW27Tse3F1v8hw8yTv21Qzwq23xW');
  });

  it('encodes a hex string', () => {
    expect(
      encode({
        ss58Format: 2112,
        data: '0xe21f7b11f35d7c6b381564b91db0e65c24c0680bfc707e0a308244704138116f',
      }),
    ).toEqual('cFNyy169p7yCy3F9p4bb7mW27Tse3F1v8hw8yTv21Qzwq23xW');
  });
});

describe('ss58', () => {
  it('decodes and encodes in various formats', () => {
    const { data, ss58Format } = decode('167ZvRqc7V6HrEUSvtV8c3JRUtPjJhHXUpAwhmPktAGj1uzq');
    expect(ss58Format).toEqual(0);

    const cf = encode({ data, ss58Format: 2112 });
    expect(cf).toEqual('cFNz3kSjvCHubkrtfYtBkzY2WpACDmXqQ9YGxbMgRD2iu1LCc');

    const kusama = encode({ data, ss58Format: 2 });
    expect(kusama).toEqual('HgtSQvQt4qkAMHNjxFBMqqGmrgKR4YZrhHCw8gMosThacdf');

    const substrate = encode({ data, ss58Format: 42 });
    expect(substrate).toEqual('5HBGn6aYFhppQhTvyFS8TtUGdGQ5cPjPQKSTYUQQL5FCqYPL');

    const vara = encode({ data, ss58Format: 137 });
    expect(vara).toEqual('kGkeZKZzLhF3YCdiFt3CY9SQR9F9fkJayvS5L3DCgj817cFGV');

    const polkadot = encode({ data, ss58Format: 0 });
    expect(polkadot).toEqual('167ZvRqc7V6HrEUSvtV8c3JRUtPjJhHXUpAwhmPktAGj1uzq');
  });
});
