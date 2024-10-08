export type ChainflipAsset =
  | 'Eth'
  | 'Flip'
  | 'Usdc'
  | 'Dot'
  | 'Btc'
  | 'ArbEth'
  | 'ArbUsdc'
  | 'Usdt'
  | 'Sol'
  | 'SolUsdc';

export type EncodedAddress =
  | Record<'Eth', Uint8Array>
  | Record<'Dot', Uint8Array>
  | Record<'Btc', `0x${string}`>
  | Record<'Arb', Uint8Array>
  | Record<'Sol', Uint8Array>;

export type BitcoinScriptPubKey =
  | Record<'P2PKH', Uint8Array>
  | Record<'P2SH', Uint8Array>
  | Record<'P2WPKH', Uint8Array>
  | Record<'P2WSH', Uint8Array>
  | Record<'Taproot', Uint8Array>
  | Record<
      'OtherSegwit',
      {
        version: number;
        program: `0x${string}`;
      }
    >;

export type ForeignChainAddress =
  | Record<'Eth', number[]>
  | Record<'Dot', Uint8Array>
  | Record<'Btc', BitcoinScriptPubKey>
  | Record<'Arb', number[]>
  | Record<'Sol', Uint8Array>;
