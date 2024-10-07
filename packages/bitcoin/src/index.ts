import { assert } from '@chainflip/utils/assertion';
import { hexToBytes } from '@chainflip/utils/bytes';
import * as bitcoin from 'bitcoinjs-lib';

type ChainflipNetwork = 'mainnet' | 'perseverance' | 'sisyphos' | 'backspin';
type BitcoinNetwork = 'mainnet' | 'testnet' | 'regtest';
type Bytelike = Uint8Array | number[] | `0x${string}`;

const p2pkhAddressVersion: Record<BitcoinNetwork, number> = {
  mainnet: 0,
  testnet: 111,
  regtest: 111,
};

const p2shAddressVersion: Record<BitcoinNetwork, number> = {
  mainnet: 5,
  testnet: 196,
  regtest: 196,
};

const networkHrp = {
  mainnet: 'bc',
  testnet: 'tb',
  regtest: 'bcrt',
} as const satisfies Record<BitcoinNetwork, string>;

export type HRP = (typeof networkHrp)[keyof typeof networkHrp];

type AddressType = 'P2SH' | 'P2PKH' | 'P2WPKH' | 'P2WSH' | 'Taproot';

type Base58AddressType = 'P2SH' | 'P2PKH';

type DecodedBase58Address = {
  type: Base58AddressType;
  data: Uint8Array;
  version: number;
};

type DecodedSegwitAddress = {
  hrp: HRP;
  data: Uint8Array;
  type: SegwitAddressType;
  version: number;
};

type SegwitAddressType = Exclude<AddressType, Base58AddressType>;

const segwitVersions: Record<SegwitAddressType, number> = {
  P2WPKH: 0,
  P2WSH: 0,
  Taproot: 1,
};

const networkMap: Record<ChainflipNetwork | BitcoinNetwork, BitcoinNetwork> = {
  mainnet: 'mainnet',
  perseverance: 'testnet',
  sisyphos: 'testnet',
  testnet: 'testnet',
  backspin: 'regtest',
  regtest: 'regtest',
};

const byteLikeToUint8Array = (data: Bytelike): Uint8Array =>
  typeof data === 'string' ? hexToBytes(data) : new Uint8Array(data);

export const encodeAddress = (
  data: Bytelike,
  kind: AddressType,
  cfOrBtcnetwork: BitcoinNetwork | ChainflipNetwork,
) => {
  const btcNetwork = networkMap[cfOrBtcnetwork];

  assert(btcNetwork, `Invalid network: ${cfOrBtcnetwork}`);
  assert(data.length % 2 === 0, 'bytes must have an even number of characters');
  assert(
    typeof data !== 'string' || /^(0x)?[0-9a-f]*$/.test(data),
    'bytes are not a valid hex string',
  );

  const bytes = byteLikeToUint8Array(data);

  switch (kind) {
    case 'P2PKH':
    case 'P2SH': {
      const version = (kind === 'P2SH' ? p2shAddressVersion : p2pkhAddressVersion)[btcNetwork];
      return bitcoin.address.toBase58Check(bytes, version);
    }
    case 'P2WPKH':
    case 'P2WSH':
    case 'Taproot':
      return bitcoin.address.toBech32(bytes, segwitVersions[kind], networkHrp[btcNetwork]);
    default:
      throw new Error(`Invalid address type: ${kind as string}`);
  }
};

export const tryDecodeAddress = (
  address: string,
  cfOrBtcNetwork: BitcoinNetwork | ChainflipNetwork,
): DecodedBase58Address | DecodedSegwitAddress | null => {
  if (/^[13mn2]/.test(address)) {
    const network = networkMap[cfOrBtcNetwork];

    const { hash, version } = bitcoin.address.fromBase58Check(address);

    if (version === p2pkhAddressVersion[network]) {
      return { type: 'P2PKH', data: hash, version };
    }

    if (version === p2shAddressVersion[network]) {
      return { type: 'P2SH', data: hash, version };
    }

    throw new TypeError(`Invalid version: ${version}`);
  }

  if (/^(bc|tb|bcrt)1/.test(address)) {
    const { data, prefix, version } = bitcoin.address.fromBech32(address);

    let type: SegwitAddressType;

    if (version === 0 && data.length === 20) {
      type = 'P2WPKH';
    } else if (version === 0) {
      type = 'P2WSH';
    } else if (version === 1) {
      type = 'Taproot';
    } else {
      throw new TypeError(`Invalid version: ${version}`);
    }

    return { hrp: prefix as HRP, data, type, version };
  }

  throw new TypeError(`Invalid address: ${address}`);
};

export const isValidAddressForNetwork = (
  address: string,
  cfOrBtcNetwork: BitcoinNetwork | ChainflipNetwork,
): boolean => {
  try {
    tryDecodeAddress(address, cfOrBtcNetwork);
    return true;
  } catch {
    return false;
  }
};
