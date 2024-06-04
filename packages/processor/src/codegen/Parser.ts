/* eslint-disable @typescript-eslint/no-non-null-assertion */
import assert from 'assert';
import * as fs from 'fs/promises';
import * as path from 'path';
import { TypeRegistry, Metadata, TypeDefInfo } from '@polkadot/types';
import { TypeDef } from '@polkadot/types/types';
import { Network, networkToRpcUrl, specVersionCache } from './utils';
import { HttpClient } from '@chainflip/rpc';
import { uncapitalize } from '@chainflip/utils/string';

const metadataDir = path.join(import.meta.dirname, '..', '..', 'metadata');

export type MetadataOpts = {
  network?: Network;
  hash?: string;
};

const hasSubs = <T extends TypeDef>(type: T, count?: number): type is T & { sub: TypeDef[] } =>
  Array.isArray(type.sub) && (count === undefined || type.sub.length === count);

const hasSub = <T extends TypeDef>(type: T): type is T & { sub: TypeDef } =>
  !Array.isArray(type.sub) && type.sub !== undefined;

const isSi = <T extends TypeDef>(
  type: T,
): type is T & { info: TypeDefInfo.Si; type: `Lookup${number}` } =>
  type.info === TypeDefInfo.Si && /^Lookup\d+$/.test(type.type);

export type PrimitiveType = { type: 'primitive'; name: string };

export const isPrimitiveType = (type: ResolvedType): type is PrimitiveType =>
  type.type === 'primitive';

export type EnumType = {
  type: 'enum';
  name: string;
  values: { name: string; value: ResolvedType }[];
};

export type StructType = {
  type: 'struct';
  name?: string;
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

function genericNamespace(namespace: string, palletName: string): string;
function genericNamespace(namespace: string | undefined, palletName: string): string | undefined;
function genericNamespace(namespace: string | undefined, palletName: string) {
  if (!namespace) return namespace;

  if (namespace.startsWith('pallet_cf_ingress_egress')) {
    const chain = /^(.+)IngressEgress$/.exec(palletName)![1];
    return namespace.replace(
      'pallet_cf_ingress_egress',
      `pallet_cf_${chain.toLowerCase()}_ingress_egress`,
    );
  }
  return namespace;
}

const resolveType = (metadata: Metadata, type: TypeDef, palletName: string): ResolvedType => {
  try {
    switch (type.info) {
      case TypeDefInfo.Enum: {
        assert(hasSubs(type));

        assert(type.lookupName, 'Enum type must have a lookupName');

        const result: EnumType = {
          type: 'enum',
          name: uncapitalize(type.lookupName),
          values: [],
        };

        for (const sub of type.sub) {
          result.values[sub.index!] = {
            name: sub.name!,
            value: resolveType(metadata, sub, palletName),
          };
        }

        return result;
      }
      case TypeDefInfo.Struct: {
        assert(hasSubs(type));

        const result: StructType = {
          type: 'struct',
          name: type.lookupName ?? genericNamespace(type.namespace, palletName),
          fields: {},
        };

        for (const sub of type.sub) {
          result.fields[sub.name!] = resolveType(metadata, sub, palletName);
        }

        return result;
      }
      case TypeDefInfo.Si:
        assert(isSi(type));
        return resolveType(metadata, metadata.registry.lookup.getTypeDef(type.type), palletName);
      case TypeDefInfo.Compact:
        assert(hasSub(type));
        return resolveType(metadata, type.sub, palletName);
      case TypeDefInfo.Null:
        return { type: 'primitive', name: 'null' };
      case TypeDefInfo.Plain:
        return { type: 'primitive', name: type.type };
      case TypeDefInfo.BTreeSet:
      case TypeDefInfo.Vec:
      case TypeDefInfo.VecFixed:
        assert(hasSub(type));
        return {
          type: 'array',
          value: resolveType(metadata, type.sub, palletName),
          length: type.length,
        };
      case TypeDefInfo.Tuple:
        assert(hasSubs(type));

        return {
          type: 'tuple',
          values: type.sub.map((t) => resolveType(metadata, t, palletName)),
        };
      case TypeDefInfo.Option:
        assert(hasSub(type));
        return {
          type: 'option',
          value: resolveType(metadata, type.sub, palletName),
        };
      case TypeDefInfo.Result:
        assert(hasSubs(type));
        return {
          type: 'enum',
          name: uncapitalize(type.typeName!),
          values: [
            {
              name: 'Ok',
              value: resolveType(metadata, type.sub[0], palletName),
            },
            {
              name: 'Err',
              value: resolveType(metadata, type.sub[1], palletName),
            },
          ],
        };
      case TypeDefInfo.Range:
        assert(hasSub(type));
        return {
          type: 'range',
          value: resolveType(metadata, type.sub, palletName),
        };
      case TypeDefInfo.BTreeMap:
        assert(hasSubs(type, 2));

        return {
          type: 'map',
          key: resolveType(metadata, type.sub[0], palletName),
          value: resolveType(metadata, type.sub[1], palletName),
        };
    }
  } catch (error) {
    console.error('failed to parse type:');
    console.error(type);
    console.error(error);
    throw error;
  }

  console.error(type);
  throw new Error(`Unhandled type: ${type.info}`);
};

const hasName = <T extends { name?: string }>(obj: T): obj is T & { name: string } =>
  obj.name !== undefined;

export type ParsedMetadata = Record<string, Record<string, ResolvedType>>;

export default class Parser {
  private readonly hash?: string;
  private readonly client: HttpClient;
  private readonly network: Network;
  private specVersion?: number;

  constructor(opts?: MetadataOpts) {
    this.hash = opts?.hash;
    this.network = opts?.network ?? 'backspin';
    this.client = new HttpClient(networkToRpcUrl[this.network]);
  }

  private async fetchMetadata() {
    const specVersion = await this.fetchSpecVersion();
    const filePath = path.join(metadataDir, `${specVersion}.scale`);

    let bytes = await fs.readFile(filePath).catch(() => null);

    if (!bytes) {
      const metadata = await this.client.sendRequest('state_getMetadata', this.hash);

      bytes = Buffer.from(metadata.slice(2), 'hex');

      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, bytes);
    }

    const registry = new TypeRegistry();
    const metadata = new Metadata(registry, bytes);
    registry.setMetadata(metadata);
    return metadata;
  }

  private async parseMetadata(): Promise<ParsedMetadata> {
    const metadata = await this.fetchMetadata();

    return Object.fromEntries(
      metadata.asV14.pallets
        .filter((pallet) => pallet.events.isSome)
        .map((pallet) => {
          const palletMetadata = pallet.events.unwrap();
          const events = metadata.registry.lookup.getTypeDef(palletMetadata.type);
          const palletName = pallet.name.toString();

          assert(hasSubs(events));

          return [palletName, events] as const;
        })
        .map(
          ([palletName, events]) =>
            [
              palletName,
              Object.fromEntries(
                events.sub
                  .filter(hasName)
                  .map((event) => [event.name, resolveType(metadata, event, palletName)] as const),
              ),
            ] as const,
        ),
    );
  }

  private async fetchSpecVersion() {
    if (this.specVersion) return this.specVersion;

    let specVersion = this.hash && (await specVersionCache.getVersion(this.hash, this.network));

    if (specVersion) return specVersion;

    ({ specVersion } = await this.client.sendRequest('state_getRuntimeVersion', this.hash));

    await specVersionCache.write(
      specVersion,
      this.hash ?? (await this.client.sendRequest('chain_getBlockHash')),
      this.network,
    );

    this.specVersion = specVersion;

    return specVersion;
  }

  async fetchAndParseSpec() {
    const specVersion = await this.fetchSpecVersion();

    const outfile = path.join(
      import.meta.dirname,
      '..',
      '..',
      'generated',
      `types-${specVersion}.json`,
    );

    let metadata = await fs
      .readFile(outfile, 'utf8')
      .then((data) => JSON.parse(data) as ParsedMetadata)
      .catch(() => null);

    if (!metadata) {
      metadata = await this.parseMetadata();

      await fs.mkdir(path.dirname(outfile), { recursive: true });
      await fs.writeFile(outfile, JSON.stringify(metadata, null, 2));
    }

    return { metadata, specVersion };
  }
}
