import { assert } from '@chainflip/utils/assertion';
import { hexToBytes } from '@chainflip/utils/bytes';
import { type ChainflipNetwork } from '@chainflip/utils/chainflip';
import * as bitcoin from 'bitcoinjs-lib';
import { networkMap, type BitcoinNetwork } from './consts';

export type Bytelike = Uint8Array | number[] | `0x${string}`;

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

export type Base58AddressType = 'P2SH' | 'P2PKH';

export type DecodedBase58Address = {
  type: Base58AddressType;
  data: Uint8Array;
  version: number;
};

export type DecodedSegwitAddress = {
  hrp: HRP;
  data: Uint8Array;
  type: SegwitAddressType;
  version: number;
};

export type SegwitAddressType = 'P2WPKH' | 'P2WSH' | 'Taproot';

const segwitVersions: Record<SegwitAddressType, number> = {
  P2WPKH: 0,
  P2WSH: 0,
  Taproot: 1,
};

const byteLikeToUint8Array = (data: Bytelike): Uint8Array =>
  typeof data === 'string' ? hexToBytes(data) : new Uint8Array(data);

export const encodeAddress = (
  data: Bytelike,
  kind: Base58AddressType | SegwitAddressType,
  cfOrBtcnetwork: BitcoinNetwork | ChainflipNetwork,
): string => {
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

export const decodeAddress = (
  address: string,
  cfOrBtcNetwork: BitcoinNetwork | ChainflipNetwork,
): DecodedBase58Address | DecodedSegwitAddress => {
  const network = networkMap[cfOrBtcNetwork];

  if (/^[13mn2]/.test(address)) {
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

    assert(prefix === networkHrp[network], `Invalid prefix: ${prefix}`);

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

    return { hrp: prefix, data, type, version };
  }

  throw new TypeError(`Invalid address "${address}" for network "${network}"`);
};

export const isValidAddressForNetwork = (
  address: string,
  cfOrBtcNetwork: BitcoinNetwork | ChainflipNetwork,
): boolean => {
  try {
    decodeAddress(address, cfOrBtcNetwork);
    return true;
  } catch {
    return false;
  }
};
