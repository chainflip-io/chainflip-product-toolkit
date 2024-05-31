import * as Bitcoin from './built/bitcoin.js';

type BitcoinAddressType = keyof typeof Bitcoin.AddressEncoding;
type ChainflipNetwork = 'mainnet' | 'perseverance' | 'sisyphos' | 'backspin';
type BitcoinNetwork = 'mainnet' | 'testnet' | 'regtest';

export const networkToBitcoinNetwork = (
  network: ChainflipNetwork | BitcoinNetwork,
): Capitalize<BitcoinNetwork> | null => {
  switch (network) {
    case 'mainnet':
      return 'Mainnet';
    case 'perseverance':
    case 'sisyphos':
    case 'testnet':
      return 'Testnet';
    case 'backspin':
    case 'regtest':
      return 'Regtest';
    default:
      return null;
  }
};

export const decodeAddress = (
  address: `0x${string}`,
  type: BitcoinAddressType,
  chainflipOrBitcoinNetwork: ChainflipNetwork | BitcoinNetwork,
) => {
  const network = networkToBitcoinNetwork(chainflipOrBitcoinNetwork);
  if (!network) throw new Error(`Invalid network: ${chainflipOrBitcoinNetwork}`);
  if (!/^0x[\da-f]+$/i.test(address)) {
    throw new Error('bytes must be hex-encoded with a 0x prefix');
  }
  if (address.length % 2 !== 0) throw new Error('bytes must have an even number of characters');
  if (!(type in Bitcoin.AddressEncoding)) throw new Error(`Invalid address type: ${type}`);

  try {
    return Bitcoin.decode(address, Bitcoin.AddressEncoding[type], Bitcoin.BitcoinNetwork[network]);
  } catch {
    throw new Error('Invalid address');
  }
};

export const getNetworkForAddress = (address: string) => {
  let network = null;
  try {
    network = Bitcoin.getNetworkForAddress(address);
  } catch {
    // pass
  }

  switch (network) {
    case Bitcoin.BitcoinNetwork.Mainnet:
      return 'mainnet';
    case Bitcoin.BitcoinNetwork.Testnet:
      return 'testnet';
    case Bitcoin.BitcoinNetwork.Regtest:
      return 'regtest';
    default:
      return null;
  }
};
