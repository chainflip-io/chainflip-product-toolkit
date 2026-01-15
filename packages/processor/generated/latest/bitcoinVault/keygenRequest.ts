import { bitcoinVaultKeygenRequest as vParser } from '../../100/bitcoinVault/keygenRequest';

export function bitcoinVaultKeygenRequest(): typeof vParser;
export function bitcoinVaultKeygenRequest() {
  return vParser;
}
