import { ethereumVaultKeygenRequest as vParser } from '../../100/ethereumVault/keygenRequest';

export function ethereumVaultKeygenRequest(): typeof vParser;
export function ethereumVaultKeygenRequest() {
  return vParser;
}
