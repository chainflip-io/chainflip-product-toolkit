export type ChainflipAsset =
  | 'Eth'
  | 'Flip'
  | 'Usdc'
  | 'Dot'
  | 'Btc'
  | 'ArbEth'
  | 'ArbUsdc'
  | 'Usdt';

export type EncodedAddress =
  | Record<'Eth', Uint8Array>
  | Record<'Dot', Uint8Array>
  | Record<'Btc', Uint8Array | `0x${string}`>
  | Record<'Arb', Uint8Array>;
