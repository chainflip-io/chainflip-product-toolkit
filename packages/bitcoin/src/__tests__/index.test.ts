import { describe, it, expect } from 'vitest';
import { encodeAddress, isValidAddressForNetwork } from '../index';

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
    expect(encodeAddress(address, kind, network)).toMatchSnapshot(`${kind} on ${network}`);
  });

  it('throws for invalid networks', () => {
    expect(() =>
      encodeAddress('0x63b7cc4432bba5c51fd09428c47abaf2d52f9373', 'P2WPKH', 'invalid' as any),
    ).toThrowErrorMatchingInlineSnapshot(`[Error: Invalid network: invalid]`);
  });

  it('throws for invalid address types', () => {
    expect(() =>
      encodeAddress('0x63b7cc4432bba5c51fd09428c47abaf2d52f9373', 'invalid' as any, 'mainnet'),
    ).toThrowErrorMatchingInlineSnapshot(`[Error: Invalid address type: invalid]`);
  });

  it('throws for invalid addresses', () => {
    expect(() =>
      encodeAddress('0x63b7cc4432bba5c51fd09428c47abaf2d52f937', 'P2WPKH', 'mainnet'),
    ).toThrowErrorMatchingInlineSnapshot(`[Error: bytes must have an even number of characters]`);
  });

  it('throws for non-hex addresses', () => {
    expect(() =>
      encodeAddress('0x63b7cc4432bba5c51fd09428c47abaf2d52f937g', 'P2WPKH', 'mainnet'),
    ).toThrowErrorMatchingInlineSnapshot(`[Error: bytes must be hex-encoded with a 0x prefix]`);
  });

  it('throws on bad addresses', () => {
    expect(() => encodeAddress('0x00', 'Taproot', 'mainnet')).toThrowErrorMatchingInlineSnapshot(
      `[Error: Invalid address]`,
    );
  });
});

describe(isValidAddressForNetwork, () => {
  const bitcoinAddresses = {
    mainnet: {
      P2PKH: ['1PYVSoeftFP4EVBN3ou8vZctkhDthJamvp'],
      P2SH: ['32k55FA93MYqbjhLk9hokD3P666Vz9QqKb'],
      Taproot: ['bc1qwqdg6squsna38e46795at95yu9atm8azzmyvckulcc7kytlcckxswvvzej'],
    },
    testnet: {
      P2PKH: ['mipcBbFg9gMiCh81Kj8tqqdgoZub1ZJRfn', 'n2ZtW11kqP6pf3umiU4NaSRgrL9aQJVuJV'],
      P2SH: ['2MzQwSSnBHWHqSAqtTVQ6v47XtaisrJa1Vc'],
      Taproot: ['tb1qw508d6qejxtdg4y5r3zarvary0c5xw7kxpjzsx'],
    },
    regtest: {
      Taproot: ['bcrt1qs758ursh4q9z627kt3pp5yysm78ddny6txaqgw'],
    },
  };

  describe.each(Object.entries(bitcoinAddresses))('for %s', (network, addressTypes) => {
    describe.each(Object.entries(addressTypes))('for %s', (kind, addresses) => {
      it.each(addresses)('gets the network for %s', (address) => {
        expect(
          isValidAddressForNetwork(address, network as 'mainnet' | 'testnet' | 'regtest'),
        ).toBe(true);
      });
    });
  });

  it('returns null for invalid addresses', () => {
    expect(isValidAddressForNetwork('invalid', 'mainnet')).toBe(false);
  });
});
