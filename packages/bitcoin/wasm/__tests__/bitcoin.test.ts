import { describe, it, expect } from 'vitest';
import { decodeAddress } from '../index';

const networks = ['mainnet', 'perseverance', 'sisyphos', 'backspin', 'regtest', 'testnet'] as const;

const cases = (
  [
    ['P2WPKH', '0x63b7cc4432bba5c51fd09428c47abaf2d52f9373'],
    ['P2SH', '0x86bc2bfa0fdb414245561008c08615f4632604f9'],
    ['P2PKH', '0xecd30fe4f116f7485d7fd2f1cf26d0a059561548'],
    ['P2WSH', '0x321e6259700f0734a61b5ffa849de17865bc3293d5d069d91f23e6cb87daedf0'],
    ['Taproot', '0x68a3db628eea903d159131fcb4a1f6ed0be6980c4ff42b80d5229ea26a38439e'],
  ] as const
).flatMap(([type, address]) => networks.map((n) => [type, n, address] as const));

describe('bitcoin', () => {
  it.each(cases)('decodes a %s address on %s', (kind, network, address) => {
    expect(decodeAddress(address, kind, network)).toMatchSnapshot(`${kind} on ${network}`);
  });

  it('throws for invalid networks', () => {
    expect(() =>
      decodeAddress('0x63b7cc4432bba5c51fd09428c47abaf2d52f9373', 'P2WPKH', 'invalid' as any),
    ).toThrowErrorMatchingInlineSnapshot(`[Error: Invalid network: invalid]`);
  });

  it('throws for invalid address types', () => {
    expect(() =>
      decodeAddress('0x63b7cc4432bba5c51fd09428c47abaf2d52f9373', 'invalid' as any, 'mainnet'),
    ).toThrowErrorMatchingInlineSnapshot(`[Error: Invalid address type: invalid]`);
  });

  it('throws for invalid addresses', () => {
    expect(() =>
      decodeAddress('0x63b7cc4432bba5c51fd09428c47abaf2d52f937', 'P2WPKH', 'mainnet'),
    ).toThrowErrorMatchingInlineSnapshot(`[Error: bytes must have an even number of characters]`);
  });

  it('throws for non-hex addresses', () => {
    expect(() =>
      decodeAddress('0x63b7cc4432bba5c51fd09428c47abaf2d52f937g', 'P2WPKH', 'mainnet'),
    ).toThrowErrorMatchingInlineSnapshot(`[Error: bytes must be hex-encoded with a 0x prefix]`);
  });

  it('throws on bad addresses', () => {
    expect(() => decodeAddress('0x00', 'Taproot', 'mainnet')).toThrowErrorMatchingInlineSnapshot(
      `[Error: Invalid address]`,
    );
  });
});
