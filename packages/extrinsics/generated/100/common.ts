export type ChainflipAsset = 'Eth' | 'Flip' | 'Usdc' | 'Dot' | 'Btc';

export type EncodedAddress =
  | Record<'Eth', Uint8Array>
  | Record<'Dot', Uint8Array>
  | Record<'Btc', Uint8Array | `0x${string}`>;
