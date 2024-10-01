/* eslint-disable no-console */
import { isNotNullish } from '@chainflip/utils/guard';
import { Metadata } from '@polkadot/types';
import { TypeDef } from '@polkadot/types/types';
import assert from 'assert';
import * as fs from 'fs/promises';
import * as path from 'path';
import { Network, specVersionCache } from './cache';
import { PalletMetadataV14, SiLookupTypeId } from '@polkadot/types/interfaces';

export type MetadataOpts = {
  network?: Network;
  hash?: string;
  generatedDir: string;
};

export type ParsedMetadata<T> = Record<string, Record<string, T>>;

const hasSubs = <T extends TypeDef>(type: T, count?: number): type is T & { sub: TypeDef[] } =>
  Array.isArray(type.sub) && (count === undefined || type.sub.length === count);

const hasName = <T extends { name?: string }>(obj: T): obj is T & { name: string } =>
  obj.name !== undefined;

export default abstract class BaseParser<T> {
  protected readonly hash?: string;
  protected readonly network: Network;
  protected readonly generatedDir: string;

  private metadata?: Metadata;
  private specVersion?: number;
  private currentPallet?: string;

  constructor(opts: MetadataOpts) {
    this.hash = opts.hash;
    this.network = opts.network ?? 'backspin';
    this.generatedDir = opts.generatedDir;
  }

  protected abstract getItems(pallet: PalletMetadataV14): { type: SiLookupTypeId } | null;

  protected abstract resolveType(call: TypeDef): T;

  protected getPalletName(): string {
    assert(this.currentPallet, 'Pallet not set');
    return this.currentPallet;
  }

  protected genericNamespace(namespace: string): string;
  protected genericNamespace(namespace: string | undefined): string | undefined;
  protected genericNamespace(namespace: string | undefined) {
    if (!namespace) return namespace;

    if (namespace.startsWith('pallet_cf_ingress_egress')) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const chain = /^(.+)IngressEgress$/.exec(this.getPalletName())![1];
      return namespace.replace(
        'pallet_cf_ingress_egress',
        `pallet_cf_${chain.toLowerCase()}_ingress_egress`,
      );
    }
    return namespace;
  }

  private tryResolveType(type: TypeDef): T {
    try {
      return this.resolveType(type);
    } catch (error) {
      console.error('failed to parse type:');
      console.error(type);
      console.error(error);
      throw error;
    }
  }

  private parseMetadata(): ParsedMetadata<T> {
    const metadata = this.getMetadataSync();

    return Object.fromEntries(
      metadata.asV14.pallets
        .map((pallet) => {
          const palletMetadata = this.getItems(pallet);
          if (!palletMetadata) return null;
          const items = metadata.registry.lookup.getTypeDef(palletMetadata.type);
          const palletName = pallet.name.toString();

          assert(hasSubs(items));

          return [palletName, items] as const;
        })
        .filter(isNotNullish)
        .map(
          ([palletName, items]) =>
            [
              palletName,
              Object.fromEntries(
                items.sub.filter(hasName).map((item) => {
                  this.currentPallet = palletName;
                  return [item.name, this.tryResolveType(item)] as const;
                }),
              ),
            ] as const,
        ),
    );
  }

  private async fetchMetadataAndSpecVersion() {
    if (this.metadata && this.specVersion) {
      return { metadata: this.metadata, specVersion: this.specVersion };
    }

    const { specVersion, metadata } = await specVersionCache.getMetadataAndVersion(
      this.network,
      this.hash,
    );

    this.specVersion = specVersion;
    this.metadata = metadata;

    return { specVersion, metadata };
  }

  protected async getMetadata(): Promise<Metadata> {
    let metadata = this.metadata;

    if (!metadata) metadata = (await this.fetchMetadataAndSpecVersion()).metadata;

    return metadata;
  }

  protected getMetadataSync(): Metadata {
    assert(this.metadata, 'Metadata not available');
    return this.metadata;
  }

  protected async getSpecVersion(): Promise<number> {
    let specVersion = this.specVersion;

    if (!specVersion) specVersion = (await this.fetchMetadataAndSpecVersion()).specVersion;

    return specVersion;
  }

  async fetchAndParseSpec(): Promise<{ metadata: ParsedMetadata<T>; specVersion: number }> {
    const specVersion = await this.getSpecVersion();

    const outfile = path.join(this.generatedDir, `types-${specVersion}.json`);

    let parsedMetadata = await fs
      .readFile(outfile, 'utf8')
      .then((data) => JSON.parse(data) as ParsedMetadata<T>)
      .catch(() => null);

    if (!parsedMetadata) {
      parsedMetadata = this.parseMetadata();

      await fs.mkdir(path.dirname(outfile), { recursive: true });
      await fs.writeFile(outfile, JSON.stringify(parsedMetadata, null, 2));
    }

    return { metadata: parsedMetadata, specVersion };
  }
}
