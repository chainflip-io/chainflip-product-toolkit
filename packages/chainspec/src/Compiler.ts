import * as fs from 'fs/promises';
import * as path from 'path';
import { SpecVersionCache, specVersionCache as defaultSpecVersionCache } from '@/chainspec/cache';
import type BaseCodeGenerator from './BaseCodeGenerator';
import { type MetadataOpts } from './BaseParser';
import type BaseParser from './BaseParser';
import type SpecVersion from './SpecVersion';
import { diffSpecs } from './utils';

export type GenerateHook<T> = (
  acc: T | undefined,
  data: { specVersion: SpecVersion; changedOrAddedEvents: Set<string> },
) => T | Promise<T>;

export default class Compiler {
  constructor(
    private readonly Parser: {
      new (opts: MetadataOpts, specVersionCache: SpecVersionCache): BaseParser;
    },
    private readonly CodeGenerator: {
      new (opts?: { trackedItems: Set<string> }): BaseCodeGenerator;
    },
    private readonly generatedDir: string,
    private readonly specVersionCache = defaultSpecVersionCache,
  ) {}

  protected async retrieveMetadata() {
    const info = await this.specVersionCache.read();
    const opts: MetadataOpts[] = Object.values(info).map((i) => ({
      ...i,
      generatedDir: this.generatedDir,
    }));

    const metadataForHashes = (
      await Promise.all(
        opts.map((o) => new this.Parser(o, this.specVersionCache).fetchAndParseSpec()),
      )
    ).sort((a, b) => a.specVersion.compare(b.specVersion));

    return metadataForHashes;
  }

  async compile(): Promise<undefined>;
  async compile<T>(cb: GenerateHook<T>): Promise<T>;
  async compile<T>(cb?: GenerateHook<T>) {
    let previousMetadata = {};
    let acc: T | undefined;

    for (const { metadata, specVersion } of await this.retrieveMetadata()) {
      const specDir = path.join(this.generatedDir, specVersion.toString());
      await fs.rm(specDir, { recursive: true, force: true });
      const { changedOrAddedEvents, changelog } = diffSpecs(previousMetadata, metadata);
      const generator = new this.CodeGenerator({ trackedItems: changedOrAddedEvents });
      for (const module of generator.generate(metadata)) {
        await module.writeFile(specDir, module.isCommon() ? changelog : undefined);
      }

      acc = await cb?.(acc, { specVersion, changedOrAddedEvents });

      previousMetadata = metadata;
    }

    return acc;
  }
}
