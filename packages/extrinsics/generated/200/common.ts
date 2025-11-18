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

export type PalletCfLendingPoolsGeneralLendingWhitelistWhitelistUpdate =
  | 'SetAllowAll'
  | { SetAllowedAccounts: `0x${string}`[] }
  | { AddAllowedAccounts: `0x${string}`[] }
  | { RemoveAllowedAccounts: `0x${string}`[] };
