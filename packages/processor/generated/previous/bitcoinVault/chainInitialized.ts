import { bitcoinVaultChainInitialized as vParser } from '../../141/bitcoinVault/chainInitialized';

export function bitcoinVaultChainInitialized(): typeof vParser;
export function bitcoinVaultChainInitialized() {
  return vParser;
}
