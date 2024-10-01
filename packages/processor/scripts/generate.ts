#!/usr/bin/env -S pnpm tsx
import { specVersionCache } from '@/chainspec/cache';
import * as fs from 'fs/promises';
import * as path from 'path';
import CodeGenerator from '../src/codegen/CodeGenerator';
import Parser, { MetadataOpts } from '../src/codegen/Parser';
import { diffSpecs } from '../src/codegen/utils';

const generatedDir = path.join(import.meta.dirname, '..', 'generated');

const generateAllCode = async () => {
  const info = await specVersionCache.read();

  const opts: MetadataOpts[] = Object.values(info);

  const metadataForHashes = (
    await Promise.all(opts.map((opts) => new Parser(opts).fetchAndParseSpec()))
  ).sort((a, b) => a.specVersion - b.specVersion);

  let previousMetadata = {};

  for (const { metadata, specVersion } of metadataForHashes) {
    const specDir = path.join(generatedDir, `${specVersion}`);
    await fs.rm(specDir, { recursive: true, force: true });
    const { changedOrAddedEvents, changelog } = diffSpecs(previousMetadata, metadata);
    const generator = new CodeGenerator({ trackedEvents: changedOrAddedEvents });
    for (const module of generator.generate(metadata)) {
      await module.writeFile(specDir, module.isCommon() ? changelog : undefined);
    }
    previousMetadata = metadata;
  }
};

await generateAllCode();
