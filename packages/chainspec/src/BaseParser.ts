/* eslint-disable no-console */
import { isNotNullish } from '@chainflip/utils/guard';
import { uncapitalize } from '@chainflip/utils/string';
import { type Metadata } from '@polkadot/types';
import { type PalletMetadataV14, type SiLookupTypeId } from '@polkadot/types/interfaces';
import { type TypeDef, TypeDefInfo } from '@polkadot/types/types';
import assert from 'assert';
import * as fs from 'fs/promises';
import * as path from 'path';
import { type Network, specVersionCache } from './cache';

export type MetadataOpts = {
  network?: Network;
  hash?: string;
  generatedDir: string;
};

const hasName = <T extends { name?: string }>(obj: T): obj is T & { name: string } =>
  obj.name !== undefined;

const hasSubs = <T extends TypeDef>(type: T, count?: number): type is T & { sub: TypeDef[] } =>
  Array.isArray(type.sub) && (count === undefined || type.sub.length === count);

const hasSub = <T extends TypeDef>(type: T): type is T & { sub: TypeDef } =>
  !Array.isArray(type.sub) && type.sub !== undefined;

const isSi = <T extends TypeDef>(
  type: T,
): type is T & { info: TypeDefInfo.Si; type: `Lookup${number}` } =>
  type.info === TypeDefInfo.Si && /^Lookup\d+$/.test(type.type);

export type PrimitiveType = { type: 'primitive'; value: string };

export const isPrimitiveType = (type: ResolvedType): type is PrimitiveType =>
  type.type === 'primitive';

export type EnumType = {
  type: 'enum';
  $name: string;
  values: { name: string; value: ResolvedType }[];
};

export type StructType = {
  type: 'struct';
  $name?: string;
  fields: Record<string, ResolvedType>;
  additionalFields?: Record<string, string>;
};

export type MapType = {
  type: 'map';
  key: ResolvedType;
  value: ResolvedType;
};

export type ArrayType = { type: 'array'; value: ResolvedType; length?: number };

export type TupleType = { type: 'tuple'; values: ResolvedType[] };

export type OptionType = { type: 'option'; value: ResolvedType };

export type RangeType = { type: 'range'; value: ResolvedType };

export type ResolvedType =
  | PrimitiveType
  | EnumType
  | StructType
  | MapType
  | ArrayType
  | TupleType
  | OptionType
  | RangeType;

export type ParsedMetadata = Record<string, Record<string, ResolvedType>>;

export default abstract class BaseParser {
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

  protected shouldParsePallet(_palletName: string): boolean {
    return true;
  }

  protected shouldParseItem(_palletName: string, _itemName: string): boolean {
    return true;
  }

  protected resolveType(type: TypeDef): ResolvedType {
    const metadata = this.getMetadataSync();

    switch (type.info) {
      case TypeDefInfo.Enum: {
        assert(hasSubs(type));

        assert(type.lookupName, 'Enum type must have a lookupName');

        const result: EnumType = {
          type: 'enum',
          $name: uncapitalize(type.lookupName),
          values: [],
        };

        for (const sub of type.sub) {
          result.values[sub.index!] = {
            name: sub.name!,
            value: this.resolveType(sub),
          };
        }

        return result;
      }
      case TypeDefInfo.Struct: {
        assert(hasSubs(type));

        const result: StructType = {
          type: 'struct',
          $name: type.lookupName ?? this.genericNamespace(type.namespace),
          fields: {},
        };

        for (const sub of type.sub) {
          result.fields[sub.name!] = this.resolveType(sub);
        }

        return result;
      }
      case TypeDefInfo.Si:
        assert(isSi(type));
        return this.resolveType(metadata.registry.lookup.getTypeDef(type.type));
      case TypeDefInfo.Compact:
        assert(hasSub(type));
        return this.resolveType(type.sub);
      case TypeDefInfo.Null:
        return { type: 'primitive', value: 'null' };
      case TypeDefInfo.Plain:
        return { type: 'primitive', value: type.type };
      case TypeDefInfo.BTreeSet:
      case TypeDefInfo.Vec:
      case TypeDefInfo.VecFixed:
        assert(hasSub(type));
        return {
          type: 'array',
          value: this.resolveType(type.sub),
          length: type.length,
        };
      case TypeDefInfo.Tuple:
        assert(hasSubs(type));

        return {
          type: 'tuple',
          values: type.sub.map((t) => this.resolveType(t)),
        };
      case TypeDefInfo.Option:
        assert(hasSub(type));
        return {
          type: 'option',
          value: this.resolveType(type.sub),
        };
      case TypeDefInfo.Result:
        assert(hasSubs(type));
        return {
          type: 'enum',
          $name: uncapitalize(type.typeName!),
          values: [
            {
              name: 'Ok',
              value: this.resolveType(type.sub[0]),
            },
            {
              name: 'Err',
              value: this.resolveType(type.sub[1]),
            },
          ],
        };
      case TypeDefInfo.Range:
        assert(hasSub(type));
        return {
          type: 'range',
          value: this.resolveType(type.sub),
        };
      case TypeDefInfo.BTreeMap:
        assert(hasSubs(type, 2));

        return {
          type: 'map',
          key: this.resolveType(type.sub[0]),
          value: this.resolveType(type.sub[1]),
        };
      default:
        throw new Error(`Unhandled type: ${type.info}`);
    }
  }

  protected getPalletName(): string {
    assert(this.currentPallet, 'Pallet not set');
    return this.currentPallet;
  }

  protected genericNamespace(namespace: string): string;
  protected genericNamespace(namespace: string | undefined): string | undefined;
  protected genericNamespace(namespace: string | undefined) {
    if (!namespace) return namespace;

    if (namespace.startsWith('pallet_cf_ingress_egress')) {
      const chain = /^(.+)IngressEgress$/.exec(this.getPalletName())![1];
      return namespace.replace(
        'pallet_cf_ingress_egress',
        `pallet_cf_${chain.toLowerCase()}_ingress_egress`,
      );
    }
    return namespace;
  }

  private tryResolveType(type: TypeDef): ResolvedType {
    try {
      return this.resolveType(type);
    } catch (error) {
      console.error('failed to parse type:');
      console.error(type);
      console.error(error);
      throw error;
    }
  }

  private parseMetadata(): ParsedMetadata {
    const metadata = this.getMetadataSync();

    return Object.fromEntries(
      metadata.asV14.pallets
        .map((pallet) => {
          const palletMetadata = this.getItems(pallet);
          if (!palletMetadata) return null;
          const items = metadata.registry.lookup.getTypeDef(palletMetadata.type);
          const palletName = pallet.name.toString();
          if (!this.shouldParsePallet(palletName)) return null;

          assert(hasSubs(items));

          return [palletName, items] as const;
        })
        .filter(isNotNullish)
        .map(([palletName, items]) => {
          const itemsAndTypes = items.sub
            .filter(hasName)
            .filter((item) => this.shouldParseItem(palletName, item.name))
            .map((item) => {
              this.currentPallet = palletName;
              return [item.name, this.tryResolveType(item)] as const;
            });

          if (!itemsAndTypes.length) return null;

          return [palletName, Object.fromEntries(itemsAndTypes)] as const;
        })
        .filter(isNotNullish),
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
    let { metadata } = this;

    if (!metadata) metadata = (await this.fetchMetadataAndSpecVersion()).metadata;

    return metadata;
  }

  protected getMetadataSync(): Metadata {
    assert(this.metadata, 'Metadata not available');
    return this.metadata;
  }

  protected async getSpecVersion(): Promise<number> {
    let { specVersion } = this;

    if (!specVersion) specVersion = (await this.fetchMetadataAndSpecVersion()).specVersion;

    return specVersion;
  }

  async fetchAndParseSpec(): Promise<{
    metadata: ParsedMetadata;
    specVersion: number;
  }> {
    const specVersion = await this.getSpecVersion();

    const outfile = path.join(this.generatedDir, `types-${specVersion}.json`);

    let parsedMetadata = await fs
      .readFile(outfile, 'utf8')
      .then((data) => JSON.parse(data) as ParsedMetadata)
      .catch(() => null);

    if (!parsedMetadata) {
      parsedMetadata = this.parseMetadata();

      await fs.mkdir(path.dirname(outfile), { recursive: true });
      await fs.writeFile(outfile, JSON.stringify(parsedMetadata, null, 2));
    }

    return { metadata: parsedMetadata, specVersion };
  }
}
