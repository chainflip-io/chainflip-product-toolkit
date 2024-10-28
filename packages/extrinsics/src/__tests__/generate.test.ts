import * as fs from 'fs/promises';
import * as os from 'os';
import * as path from 'path';
import { describe, it, expect } from 'vitest';
import generateAllCode from '@/chainspec/generateAllCode';
import CodeGenerator from '../codegen/CodeGenerator';
import Parser from '../codegen/Parser';

async function* readdir(dir: string): AsyncGenerator<string> {
  const dirents = await fs.readdir(dir, { withFileTypes: true });

  for (const dirent of dirents) {
    const res = path.resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* readdir(res);
    } else if (dirent.isFile()) {
      yield res;
    }
  }
}

describe('extrinsic codegen', () => {
  it('generates the code in the desired format', async () => {
    const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'extrinsics-codegen-'));

    await generateAllCode(Parser, CodeGenerator, dir);

    for await (const file of readdir(dir)) {
      if (!file.includes('/160/')) continue;
      const content = await fs.readFile(file, 'utf-8');
      expect(content).toMatchSnapshot(file.replace(dir, ''));
    }
  });
});
