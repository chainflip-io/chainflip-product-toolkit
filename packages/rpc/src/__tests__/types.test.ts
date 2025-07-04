import { capitalize } from '@chainflip/utils/string';
import * as fs from 'fs/promises';
import * as path from 'path';
import { describe, expect, it } from 'vitest';
import { rpcResult } from '../common';

// very simple return types
const IGNORED_METHODS = [
  'cf_eth_state_chain_gateway_address',
  'cf_authority_emission_per_block',
  'cf_epoch_duration',
  'cf_eth_key_manager_address',
];

describe('types', () => {
  it.each(
    Object.keys(rpcResult).filter(
      (key) => !/(state|broker|chain)_/.test(key) && !IGNORED_METHODS.includes(key),
    ),
  )('has a result export', async (key) => {
    const file = await fs.readFile(path.join(import.meta.dirname, '..', 'types.ts'), 'utf8');
    const exportName = capitalize(key).replace(/_(.)/g, (_, char: string) => char.toUpperCase());

    expect(file).toMatch(new RegExp(`export type ${exportName} =\\s+RpcResult<'${key}'>;`));
  });

  it.each(
    Object.keys(rpcResult).filter(
      (key) => !/(state|broker|chain)_/.test(key) && !IGNORED_METHODS.includes(key),
    ),
  )('has a response export', async (key) => {
    const file = await fs.readFile(path.join(import.meta.dirname, '..', 'types.ts'), 'utf8');
    const exportName = capitalize(key).replace(/_(.)/g, (_, char: string) => char.toUpperCase());

    expect(file).toMatch(
      new RegExp(`export type ${exportName}Response =\\s+RpcResponse<'${key}'>;`),
    );
  });
});
