import { specVersionCache } from '@/chainspec/cache';
import * as fs from 'fs/promises';
import * as path from 'path';
import BaseParser, { MetadataOpts } from './BaseParser';
import BaseCodeGenerator from './BaseCodeGenerator';
import { diffSpecs } from './utils';

const generateAllCode = async (
  Parser: { new (opts: MetadataOpts): BaseParser },
  CodeGenerator: { new (opts?: { trackedItems: Set<string> }): BaseCodeGenerator },
  generatedDir: string,
) => {
  const info = await specVersionCache.read();

  const opts: MetadataOpts[] = Object.values(info).map((i) => ({ ...i, generatedDir }));

  const metadataForHashes = (
    await Promise.all(opts.map((opts) => new Parser(opts).fetchAndParseSpec()))
  ).sort((a, b) => a.specVersion - b.specVersion);

  let previousMetadata = {};

  for (const { metadata, specVersion } of metadataForHashes) {
    const specDir = path.join(generatedDir, `${specVersion}`);
    await fs.rm(specDir, { recursive: true, force: true });
    const { changedOrAddedEvents, changelog } = diffSpecs(previousMetadata, metadata);
    const generator = new CodeGenerator({ trackedItems: changedOrAddedEvents });
    for (const module of generator.generate(metadata)) {
      await module.writeFile(specDir, module.isCommon() ? changelog : undefined);
    }
    previousMetadata = metadata;
  }
};

export default generateAllCode;
