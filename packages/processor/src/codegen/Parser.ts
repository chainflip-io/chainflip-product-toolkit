import { uncapitalize } from '@chainflip/utils/string';
import { TypeDefInfo } from '@polkadot/types';
import { type PalletMetadataV14, type SiLookupTypeId } from '@polkadot/types/interfaces';
import { type TypeDef } from '@polkadot/types/types';
import assert from 'assert';
import BaseParser from '@/chainspec/BaseParser';

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

export default class Parser extends BaseParser {
  protected getItems(pallet: PalletMetadataV14): { type: SiLookupTypeId } | null {
    return pallet.events.isSome ? pallet.events.unwrap() : null;
  }

  protected resolveType(type: TypeDef): ResolvedType {
    const metadata = this.getMetadataSync();

    switch (type.info) {
      case TypeDefInfo.Enum: {
        assert(hasSubs(type));

        assert(type.lookupName, 'Enum type must have a lookupName');

        const result: EnumType = {
          type: 'enum',
          // inserts the pallet name to make it distinct, e.g. `CfPalletIngressEgress...` => `CfPalletSolanaIngressEgress...`
          name: uncapitalize(type.lookupName).replace('IngressEgress', this.getPalletName()),
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
          name: type.lookupName ?? this.genericNamespace(type.namespace),
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
        return { type: 'primitive', name: 'null' };
      case TypeDefInfo.Plain:
        return { type: 'primitive', name: type.type };
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
          name: uncapitalize(type.typeName!),
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
        console.error(type);
        throw new Error(`Unhandled type: ${type.info}`);
    }
  }
}
