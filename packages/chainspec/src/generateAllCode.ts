import * as fs from 'fs/promises';
import * as path from 'path';
import { specVersionCache } from '@/chainspec/cache';
import type BaseCodeGenerator from './BaseCodeGenerator';
import { ParsedMetadata, type MetadataOpts } from './BaseParser';
import type BaseParser from './BaseParser';
import { diffSpecs } from './utils';

export type GenerateHook<T> = (
  acc: T | undefined,
  data: {
    new: {
      metadata: ParsedMetadata;
      specVersion: number;
    };
    old: {
      metadata: ParsedMetadata;
      specVersion: number;
    };
  },
) => T | Promise<T>;

async function generateAllCode(
  Parser: { new (opts: MetadataOpts): BaseParser },
  CodeGenerator: { new (opts?: { trackedItems: Set<string> }): BaseCodeGenerator },
  generatedDir: string,
): Promise<undefined>;
async function generateAllCode<T>(
  Parser: { new (opts: MetadataOpts): BaseParser },
  CodeGenerator: { new (opts?: { trackedItems: Set<string> }): BaseCodeGenerator },
  generatedDir: string,
  cb: GenerateHook<T>,
): Promise<T>;
async function generateAllCode<T>(
  Parser: { new (opts: MetadataOpts): BaseParser },
  CodeGenerator: { new (opts?: { trackedItems: Set<string> }): BaseCodeGenerator },
  generatedDir: string,
  cb?: GenerateHook<T>,
) {
  const info = await specVersionCache.read();

  const opts: MetadataOpts[] = Object.values(info).map((i) => ({ ...i, generatedDir }));

  const metadataForHashes = (
    await Promise.all(opts.map((o) => new Parser(o).fetchAndParseSpec()))
  ).sort((a, b) => a.specVersion - b.specVersion);

  let previousMetadata = {};
  let acc: T | undefined;
  let previousSpecVersion = 0;

  for (const { metadata, specVersion } of metadataForHashes) {
    const specDir = path.join(generatedDir, `${specVersion}`);
    await fs.rm(specDir, { recursive: true, force: true });
    const { changedOrAddedEvents, changelog } = diffSpecs(previousMetadata, metadata);
    const generator = new CodeGenerator({ trackedItems: changedOrAddedEvents });
    for (const module of generator.generate(metadata)) {
      await module.writeFile(specDir, module.isCommon() ? changelog : undefined);
    }

    acc = await cb?.(acc, {
      new: { metadata, specVersion },
      old: { metadata: previousMetadata, specVersion: previousSpecVersion },
    });

    previousMetadata = metadata;
    previousSpecVersion = specVersion;
  }

  return acc;
}

export default generateAllCode;
