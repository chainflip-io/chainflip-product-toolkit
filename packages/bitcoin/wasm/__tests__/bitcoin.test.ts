import { describe, it, expect } from 'vitest';
import { decodeAddress } from '../index';

describe('bitcoin', () => {
  it.each([
    [
      'P2WPKH',
      '0x63b7cc4432bba5c51fd09428c47abaf2d52f9373',
      'bc1qvwmuc3pjhwju287sjs5vg7467t2jlymnmjyatp',
    ],
    ['P2SH', '0x86bc2bfa0fdb414245561008c08615f4632604f9', '3DyRteshezqPfEwP5gyNX77nmyomu5GW2U'],
    ['P2PKH', '0xecd30fe4f116f7485d7fd2f1cf26d0a059561548', '1NbDK88PF7P5B4wTVk3HcJ3U8GJeiSrccq'],
    [
      'P2WSH',
      '0x321e6259700f0734a61b5ffa849de17865bc3293d5d069d91f23e6cb87daedf0',
      'bc1qxg0xyktspurnffsmtlagf80p0pjmcv5n6hgxnkgly0nvhp76ahcqamg47k',
    ],
    [
      'Taproot',
      '0x68a3db628eea903d159131fcb4a1f6ed0be6980c4ff42b80d5229ea26a38439e',
      'bc1pdz3akc5wa2gr69v3x87tfg0ka597dxqvfl6zhqx4y202y63cgw0qxt7wp4',
    ],
  ] as const)('decods a %s address', (kind, address, expected) => {
    expect(decodeAddress(address, kind, 'mainnet')).toEqual(expected);
  });
});
