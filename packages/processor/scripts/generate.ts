#!/usr/bin/env -S pnpm tsx
import Parser, { MetadataOpts } from '../src/Parser';
import CodeGenerator from '../src/CodeGenerator';
import { diffSpecs, specVersionCache } from '../src/utils';

const generateAllCode = async () => {
  const info = await specVersionCache.read();

  const opts: MetadataOpts[] = Object.values(info);

  const metadataForHashes = (
    await Promise.all(opts.map((opts) => new Parser(opts).fetchAndParseSpec()))
  ).sort((a, b) => a.specVersion - b.specVersion);

  let previousMetadata = {};

  for (const { metadata, specVersion } of metadataForHashes) {
    const eventsChanged = diffSpecs(previousMetadata, metadata);
    const generator = new CodeGenerator({ trackedEvents: eventsChanged });
    await generator.generate(specVersion, metadata);
    previousMetadata = metadata;
  }
};

await generateAllCode();
