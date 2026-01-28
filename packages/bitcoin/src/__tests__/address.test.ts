import { bytesToHex } from '@chainflip/utils/bytes';
import * as bitcoin from 'bitcoinjs-lib';
import { describe, it, expect, vi } from 'vitest';
import { encodeAddress, decodeAddress, isValidAddressForNetwork } from '../address';

vi.mock('bitcoinjs-lib', async (importOriginal) => {
  const actual = await importOriginal<typeof import('bitcoinjs-lib')>();
  return {
    ...actual,
    address: {
      ...actual.address,
      fromBech32: vi.fn(actual.address.fromBech32),
      fromBase58Check: vi.fn(actual.address.fromBase58Check),
    },
  };
});

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
  it.each(cases)('encodes and decodes a %s address on %s', (kind, network, address) => {
    const result = encodeAddress(address, kind, network);
    expect(result).toMatchSnapshot(`${kind} on ${network}`);
    expect(encodeAddress(Buffer.from(address.slice(2), 'hex'), kind, network)).toEqual(result);
    expect(encodeAddress([...Buffer.from(address.slice(2), 'hex')], kind, network)).toEqual(result);
    expect(bytesToHex(decodeAddress(result, network).data)).toEqual(address);
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
    ).toThrowErrorMatchingInlineSnapshot(`[Error: bytes are not a valid hex string]`);
  });
});

describe(isValidAddressForNetwork, () => {
  const keys = <T extends Record<string, unknown>>(obj: T) => Object.keys(obj) as (keyof T)[];

  const bitcoinAddresses = {
    mainnet: {
      P2PKH: ['1PYVSoeftFP4EVBN3ou8vZctkhDthJamvp'],
      P2SH: ['32k55FA93MYqbjhLk9hokD3P666Vz9QqKb'],
      Taproot: ['bc1qwqdg6squsna38e46795at95yu9atm8azzmyvckulcc7kytlcckxswvvzej'],
      P2WSH: ['bc1qeklep85ntjz4605drds6aww9u0qr46qzrv5xswd35uhjuj8ahfcqgf6hak'],
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

  it('handles mainnet addresses', () => {
    const addresses = bitcoinAddresses.mainnet;

    for (const kind of keys(addresses)) {
      for (const address of addresses[kind]) {
        expect(isValidAddressForNetwork(address, 'mainnet')).toBe(true);
      }
    }

    for (const network of ['testnet', 'regtest'] as const) {
      for (const address of Object.values(bitcoinAddresses[network]).flat()) {
        expect(isValidAddressForNetwork(address, 'mainnet')).toBe(false);
      }
    }
  });

  it('handles testnet addresses', () => {
    const addresses = bitcoinAddresses.testnet;

    for (const kind of keys(addresses)) {
      for (const address of addresses[kind]) {
        expect(isValidAddressForNetwork(address, 'testnet')).toBe(true);
      }
    }

    for (const network of ['mainnet', 'regtest'] as const) {
      for (const address of Object.values(bitcoinAddresses[network]).flat()) {
        expect(isValidAddressForNetwork(address, 'testnet')).toBe(false);
      }
    }
  });

  it('handles regtest addresses', () => {
    const addresses = bitcoinAddresses.regtest;

    for (const kind of keys(addresses)) {
      for (const address of addresses[kind]) {
        expect(isValidAddressForNetwork(address, 'regtest')).toBe(true);
      }
    }

    for (const address of Object.values(bitcoinAddresses.mainnet).flat()) {
      expect(isValidAddressForNetwork(address, 'regtest')).toBe(false);
    }

    for (const type of keys(bitcoinAddresses.testnet)) {
      for (const address of bitcoinAddresses.testnet[type]) {
        expect(isValidAddressForNetwork(address, 'regtest')).toBe(type !== 'Taproot');
      }
    }
  });

  it('returns false for invalid addresses', () => {
    expect(isValidAddressForNetwork('invalid', 'mainnet')).toBe(false);
    expect(
      isValidAddressForNetwork(
        'bc1teklep85ntjz4605drds6aww9u0qr46qzrv5xswd35uhjuj8ahfcqgf6hak',
        'mainnet',
      ),
    ).toBe(false);
  });
});

describe('decodeAddress with invalid versions', () => {
  it('throws for invalid bech32 version', () => {
    vi.mocked(bitcoin.address.fromBech32).mockReturnValueOnce({
      version: 99,
      prefix: 'bc',
      data: Buffer.from('0000000000000000000000000000000000000000', 'hex'),
    });

    expect(() => decodeAddress('bc1qtest', 'mainnet')).toThrow('Invalid version: 99');
  });

  it('throws for invalid base58 version', () => {
    vi.mocked(bitcoin.address.fromBase58Check).mockReturnValueOnce({
      version: 99,
      hash: Buffer.from('0000000000000000000000000000000000000000', 'hex'),
    });

    expect(() => decodeAddress('1test', 'mainnet')).toThrow('Invalid version: 99');
  });
});
