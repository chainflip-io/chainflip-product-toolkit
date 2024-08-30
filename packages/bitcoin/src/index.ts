import { assert } from '@chainflip/utils/assertion';
import * as base58 from '@chainflip/utils/base58';
import { hexToBytes } from '@chainflip/utils/bytes';
import { sha256 } from '@noble/hashes/sha256';

type ChainflipNetwork = 'mainnet' | 'perseverance' | 'sisyphos' | 'backspin';
type BitcoinNetwork = 'mainnet' | 'testnet' | 'regtest';

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

const networkHrp: Record<BitcoinNetwork, string> = {
  mainnet: 'bc',
  testnet: 'tb',
  regtest: 'bcrt',
};

function parseBase58Address(address: string, network: BitcoinNetwork) {
  const checksumLength = 4;
  const payloadLength = 21;

  const data = base58.decode(address);

  if (data.length !== payloadLength + checksumLength) return null;

  const payload = data.slice(0, payloadLength);
  const checksum = data.slice(-checksumLength);

  const computedChecksum = sha256(sha256(payload)).slice(0, checksumLength);

  if (!computedChecksum.every((byte, i) => byte === checksum[i])) return null;

  const [version, ...hash] = payload;

  if (version === p2pkhAddressVersion[network]) {
    return { type: 'p2pkh', hash: hash };
  }

  if (version === p2shAddressVersion[network]) {
    return { type: 'p2sh', hash: hash };
  }

  return null;
}

function encodeBase58Address(data: `0x${string}`, network: BitcoinNetwork, type: 'P2SH' | 'P2PKH') {
  const version = (type === 'P2SH' ? p2shAddressVersion : p2pkhAddressVersion)[network];
  const payload = new Uint8Array([version, ...hexToBytes(data)]);
  const checksum = sha256(sha256(payload)).slice(0, 4);
  const address = base58.encode(Buffer.concat([payload, checksum]));
  return address;
}

const BECH32_CHARSET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';

function decodeBech32(address: string): { hrp: string; data: number[] } | null {
  // Find the separator '1'
  const pos = address.lastIndexOf('1');
  if (pos === -1 || pos === 0 || pos + 7 > address.length) {
    return null; // Invalid Bech32 address
  }

  const hrp = address.substring(0, pos);
  const data = [];
  for (let i = pos + 1; i < address.length; i++) {
    const charIndex = BECH32_CHARSET.indexOf(address[i]);
    if (charIndex === -1) return null; // Invalid character in data part

    data.push(charIndex);
  }

  return { hrp, data };
}

function polymod(values: number[]): number {
  const generators = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3];
  let chk = 1;
  for (const value of values) {
    const top = chk >> 25;
    chk = ((chk & 0x1ffffff) << 5) ^ value;
    for (let i = 0; i < 5; i++) {
      if ((top >> i) & 1) {
        chk ^= generators[i];
      }
    }
  }
  return chk;
}

function hrpExpand(hrp: string): number[] {
  const ret = [];
  for (let i = 0; i < hrp.length; i++) {
    ret.push(hrp.charCodeAt(i) >> 5);
  }
  ret.push(0);
  for (let i = 0; i < hrp.length; i++) {
    ret.push(hrp.charCodeAt(i) & 31);
  }
  return ret;
}

function computeChecksum(hrp: string, data: number[]): number {
  return polymod(hrpExpand(hrp).concat(data));
}

const checksums = {
  bech32: 1,
  bech32m: 0x2bc830a3,
} as const;

type Variant = keyof typeof checksums;

function convert5BitGroupsToBytes(data: number[]): Uint8Array {
  let acc = 0;
  let bits = 0;
  const result = [];
  for (let i = 0; i < data.length; i++) {
    acc = (acc << 5) | data[i];
    bits += 5;
    if (bits >= 8) {
      result.push((acc >> (bits - 8)) & 0xff); // Extract the top 8 bits
      bits -= 8;
    }
  }

  // Handle any remaining bits
  if (bits > 0) {
    const remainingByte = (acc << (8 - bits)) & 0xff;
    // Only push the remaining byte if it is not zero or bits are fully used
    if (remainingByte !== 0 || bits > 5) {
      result.push(remainingByte);
    }
  }

  return new Uint8Array(result);
}

function decodeSegwitAddress(address: string) {
  const decoded = decodeBech32(address.toLowerCase());

  if (!decoded) {
    return null; // Invalid address format
  }

  const { hrp, data: dataWithChecksum } = decoded;

  const checksum = computeChecksum(hrp, dataWithChecksum);
  let type;

  if (checksum === 1) {
    type = 'bech32';
  } else if (checksum === 0x2bc830a3) {
    type = 'bech32m';
  } else {
    return null; // Invalid checksum
  }

  // Remove version and checksum from data
  const data = convert5BitGroupsToBytes(dataWithChecksum.slice(1, -6));
  const [version] = dataWithChecksum;

  assert(data.length >= 2 && data.length <= 40, 'Invalid address');
  assert(version !== 0 || data.length === 20 || data.length === 32, 'Invalid address');

  return { hrp, data, type, version };
}

function createChecksum(hrp: string, data: number[], variant: Variant): number[] {
  const values = hrpExpand(hrp).concat(data).concat([0, 0, 0, 0, 0, 0]);
  const polymodValue = polymod(values) ^ checksums[variant];
  const checksum = [];
  for (let i = 0; i < 6; i++) {
    checksum.push((polymodValue >> (5 * (5 - i))) & 31);
  }
  return checksum;
}

function encodeBech32(hrp: string, data: number[]): string {
  return `${hrp}1${data.map((i) => BECH32_CHARSET[i]).join('')}`;
}

function convertBytesTo5BitGroups(data: Uint8Array): number[] {
  let acc = 0;
  let bits = 0;
  const result = [];
  for (let i = 0; i < data.length; i++) {
    acc = (acc << 8) | data[i];
    bits += 8;
    while (bits >= 5) {
      result.push((acc >> (bits - 5)) & 31); // Extract the top 5 bits
      bits -= 5;
    }
  }
  if (bits > 0) {
    result.push((acc << (5 - bits)) & 31); // Add remaining bits as the last group
  }
  return result;
}

type SegwitAddressType = 'P2WPKH' | 'P2WSH' | 'Taproot';

const segwitVersions: Record<SegwitAddressType, number> = {
  P2WPKH: 0,
  P2WSH: 0,
  Taproot: 1,
};

function encodeSegwitAddress(
  hexData: `0x${string}`,
  kind: SegwitAddressType,
  network: BitcoinNetwork,
) {
  const variant = kind === 'Taproot' ? 'bech32m' : 'bech32';
  const bytes = hexToBytes(hexData);
  const version = segwitVersions[kind];
  assert(bytes.length >= 2 && bytes.length <= 40, 'Invalid address');
  assert(version !== 0 || bytes.length === 20 || bytes.length === 32, 'Invalid address');
  const data = [segwitVersions[kind]].concat(convertBytesTo5BitGroups(bytes));
  const hrp = networkHrp[network];
  const checksum = createChecksum(hrp, data, variant);
  return encodeBech32(hrp, data.concat(checksum));
}

type AddressType = 'P2WPKH' | 'P2SH' | 'P2PKH' | 'P2WSH' | 'Taproot';

const networkMap: Record<ChainflipNetwork | BitcoinNetwork, BitcoinNetwork> = {
  mainnet: 'mainnet',
  perseverance: 'testnet',
  sisyphos: 'testnet',
  testnet: 'testnet',
  backspin: 'regtest',
  regtest: 'regtest',
};

export const encodeAddress = (
  data: `0x${string}`,
  kind: AddressType,
  cfOrBtcnetwork: BitcoinNetwork | ChainflipNetwork,
) => {
  const btcNetwork = networkMap[cfOrBtcnetwork];

  assert(btcNetwork, `Invalid network: ${cfOrBtcnetwork}`);
  assert(data.length % 2 === 0, 'bytes must have an even number of characters');
  assert(/^(0x)?[0-9a-f]*$/.test(data), 'bytes must be hex-encoded with a 0x prefix');

  switch (kind) {
    case 'P2PKH':
    case 'P2SH':
      return encodeBase58Address(data, btcNetwork, kind);
    case 'P2WPKH':
    case 'P2WSH':
    case 'Taproot':
      return encodeSegwitAddress(data, kind, btcNetwork);
    default:
      throw new Error(`Invalid address type: ${kind as string}`);
  }
};

export const isValidAddressForNetwork = (address: string, network: BitcoinNetwork) => {
  if (network === 'mainnet') {
    if (/^(1|3)/.test(address)) {
      return parseBase58Address(address, network) !== null;
    }

    if (/^bc1/.test(address)) {
      return decodeSegwitAddress(address) !== null;
    }
  } else {
    if (/^(m|n|2)/.test(address)) {
      return parseBase58Address(address, network) !== null;
    }

    if (/^(tb|bcrt)1/.test(address)) {
      return decodeSegwitAddress(address) !== null;
    }
  }

  return false;
};
