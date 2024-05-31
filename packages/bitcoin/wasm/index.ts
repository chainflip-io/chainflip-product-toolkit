import * as Bitcoin from './built/bitcoin.js';

type BitcoinAddressType = keyof typeof Bitcoin.AddressEncoding;
type ChainflipNetwork = 'mainnet' | 'perseverance' | 'sisyphos' | 'backspin';
type BitcoinNetwork = 'mainnet' | 'testnet' | 'regtest';

export const networkToBitcoinNetwork = (
  network: ChainflipNetwork | BitcoinNetwork,
): Bitcoin.BitcoinNetwork => {
  switch (network) {
    case 'mainnet':
      return Bitcoin.BitcoinNetwork.Mainnet;
    case 'perseverance':
    case 'sisyphos':
    case 'testnet':
      return Bitcoin.BitcoinNetwork.Testnet;
    case 'backspin':
    case 'regtest':
      return Bitcoin.BitcoinNetwork.Regtest;
    default:
      throw new Error(`Invalid network: ${network as unknown as string}`);
  }
};

export const decodeAddress = (
  address: `0x${string}`,
  type: BitcoinAddressType,
  chainflipOrBitcoinNetwork: ChainflipNetwork | BitcoinNetwork,
) => {
  const network = networkToBitcoinNetwork(chainflipOrBitcoinNetwork);
  if (!/^0x[\da-f]+$/i.test(address)) {
    throw new Error('bytes must be hex-encoded with a 0x prefix');
  }
  if (address.length % 2 !== 0) throw new Error('bytes must have an even number of characters');
  if (!(type in Bitcoin.AddressEncoding)) throw new Error(`Invalid address type: ${type}`);

  try {
    return Bitcoin.decode(address, Bitcoin.AddressEncoding[type], network);
  } catch {
    throw new Error('Invalid address');
  }
};

export const isValidAddressForNetwork = (
  address: string,
  network: ChainflipNetwork | BitcoinNetwork,
) => Bitcoin.isValidAddressForNetwork(address, networkToBitcoinNetwork(network));
