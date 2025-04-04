import { ChainflipNetwork } from '@chainflip/utils/chainflip';

export type BitcoinNetwork = 'mainnet' | 'testnet' | 'regtest';

export const networkMap: Record<ChainflipNetwork | BitcoinNetwork, BitcoinNetwork> = {
  mainnet: 'mainnet',
  perseverance: 'testnet',
  sisyphos: 'testnet',
  testnet: 'testnet',
  backspin: 'regtest',
  regtest: 'regtest',
};
