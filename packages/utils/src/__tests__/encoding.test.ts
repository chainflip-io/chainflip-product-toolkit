import { describe, expect, it } from 'vitest';
import { decodeWithCharset, encodeWithCharset } from '../encoding';

describe(encodeWithCharset, () => {
  it('encodes a number in a charset', () => {
    expect(encodeWithCharset([0xff], '0123456789')).toBe('255');
    expect(encodeWithCharset([0xff, 0xff], '0123456789')).toBe('65535');
    expect(encodeWithCharset([0x8], '01')).toBe('1000');
  });
});

describe(decodeWithCharset, () => {
  it('decodes a number from a charset', () => {
    expect(decodeWithCharset('255', '0123456789')).toEqual([0xff]);
    expect(decodeWithCharset('65535', '0123456789')).toEqual([0xff, 0xff]);
    expect(decodeWithCharset('1000000', '01')).toEqual([64]);
  });
});
