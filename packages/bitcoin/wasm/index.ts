import { capitalize } from '@chainflip/utils/string';
import { assert, assertType } from '@chainflip/utils/assertion';
import { decode, ChainflipNetwork as WasmChainflipNetwork, AddressEncoding } from './built/bitcoin';

type BitcoinAddressType = keyof typeof AddressEncoding;
type ChainflipNetwork = 'mainnet' | 'perseverance' | 'sisyphos' | 'backspin';

export const decodeAddress = (
  address: string,
  type: BitcoinAddressType,
  network: ChainflipNetwork,
) => {
  const capitalizedNetwork = capitalize(network);
  assert(address.startsWith('0x'), 'Address must start with 0x');
  assert(address.length % 2 === 0, 'Address must have an even number of characters');
  assertType('number', AddressEncoding[type], `Invalid address type: ${type}`);
  assertType('number', WasmChainflipNetwork[capitalizedNetwork], `Invalid network: ${network}`);
  return decode(address, AddressEncoding[type], WasmChainflipNetwork[capitalizedNetwork]);
};
