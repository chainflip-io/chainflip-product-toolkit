#!/usr/bin/env -S pnpm tsx
import * as fs from 'fs/promises';
import * as path from 'path';
import Parser, { MetadataOpts } from '../src/codegen/Parser';
import CodeGenerator from '../src/codegen/CodeGenerator';
import { diffSpecs, specVersionCache } from '../src/codegen/utils';

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
    const eventsChanged = diffSpecs(previousMetadata, metadata);
    const generator = new CodeGenerator({ trackedEvents: eventsChanged });
    for (const module of generator.generate(metadata)) {
      await module.writeFile(specDir);
    }
    previousMetadata = metadata;
  }
};

await generateAllCode();
