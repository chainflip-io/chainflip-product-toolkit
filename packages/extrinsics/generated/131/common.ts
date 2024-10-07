export type ChainflipAsset = 'Eth' | 'Flip' | 'Usdc' | 'Dot' | 'Btc' | 'Usdt';

export type EncodedAddress =
  | Record<'Eth', Uint8Array>
  | Record<'Dot', Uint8Array>
  | Record<'Btc', `0x${string}`>;
