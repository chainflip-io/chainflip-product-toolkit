#!/usr/bin/env -S pnpm tsx
import { MetadataOpts, fetchAndParseSpec } from '../src/parser';
import CodeGenerator from '../src/codegen';
import { diffSpecs, specVersionCache } from '../src/utils';

const generateAllCode = async () => {
  const info = await specVersionCache.read();

  const hashes: MetadataOpts[] = Object.values(info);

  const metadataForHashes = (await Promise.all(hashes.map((hash) => fetchAndParseSpec(hash)))).sort(
    (a, b) => a.specVersion - b.specVersion,
  );

  let previousMetadata = {};

  for (const { metadata, specVersion } of metadataForHashes) {
    const eventsChanged = diffSpecs(previousMetadata, metadata);
    const generator = new CodeGenerator({ trackedEvents: eventsChanged });
    await generator.generate(specVersion, metadata);
    previousMetadata = metadata;
  }
};

await generateAllCode();
