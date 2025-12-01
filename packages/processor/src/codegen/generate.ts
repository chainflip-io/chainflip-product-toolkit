import * as fs from 'fs/promises';
import * as os from 'os';
import * as path from 'path';
import { Network, SpecVersionCache } from '@/chainspec/cache';
import Compiler from '@/chainspec/Compiler';
import CodeGenerator from './CodeGenerator';
import Parser from './Parser';

export default async function generate(outputDir: string): Promise<void> {
  const specVersion = 0;

  class InMemorySpecVersionCache extends SpecVersionCache {
    constructor() {
      super('');
    }

    protected override async persistMetadata(
      _specVersion: number,
      _filePath: string,
      _bytes: Uint8Array,
    ): Promise<void> {
      // no-op
    }

    protected override async write(_id: number, _hash: string, _network: Network): Promise<void> {
      // no-op
    }

    protected override fetchSpecVersion(_hash: string, _network: Network): Promise<number> {
      return Promise.resolve(specVersion);
    }

    override read() {
      return Promise.resolve({ [specVersion]: { network: 'localnet' as const } });
    }
  }

  await fs.rm(outputDir, { recursive: true, force: true });
  await fs.mkdir(outputDir, { recursive: true });
  const tmpdir = await fs.mkdtemp(path.join(os.tmpdir(), 'codgen-'));
  await new Compiler(Parser, CodeGenerator, tmpdir, new InMemorySpecVersionCache()).compile();
  await fs.rename(path.join(tmpdir, specVersion.toString()), outputDir);
  await fs.rm(tmpdir, { recursive: true, force: true });
}
