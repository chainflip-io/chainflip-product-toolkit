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
  | 'SolUsdc'
  | 'HubDot'
  | 'HubUsdt'
  | 'HubUsdc';

export type CfTraitsLendingRepaymentAmount = 'Full' | { Exact: `${number}` | `0x${string}` };
