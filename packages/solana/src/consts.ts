import { ChainflipAsset } from '@chainflip/utils/chainflip';

export type SolanaAsset = Extract<ChainflipAsset, `Sol${string}`>;
export type SolanaNetwork = 'mainnet' | 'devnet';
export type SupportedToken = Exclude<SolanaAsset, 'Sol'>;
export type TokenMintAddress = string & { __brand: 'TokenMintAddress' };

export const addresses = {
  mainnet: {
    SolUsdc: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v' as TokenMintAddress,
    SolUsdt: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB' as TokenMintAddress,
  },
  devnet: {
    SolUsdc: '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU' as TokenMintAddress,
    SolUsdt: 'FvuqJYh8YeEmarW5qkSrYeEgzaTKktgL3vhgBy2Csy4o' as TokenMintAddress,
  },
} satisfies Record<SolanaNetwork, Record<SupportedToken, TokenMintAddress>>;
