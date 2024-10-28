import { capitalize } from '@chainflip/utils/string';
import * as fs from 'fs/promises';
import * as path from 'path';
import { describe, expect, it } from 'vitest';
import { rpcResult } from '../common';

describe('types', () => {
  it.each(Object.keys(rpcResult).filter((key) => key.startsWith('cf_')))(
    'should have two exports for %s',
    async (key) => {
      const file = await fs.readFile(path.join(import.meta.dirname, '..', 'types.ts'), 'utf8');
      const exportName = capitalize(key).replace(/_(.)/g, (_, char: string) => char.toUpperCase());
      expect(file).toContain(`export type ${exportName} = RpcResult<'${key}'>;`);
      expect(file).toContain(`export type ${exportName}Response = RpcResponse<'${key}'>;`);
    },
  );
});
