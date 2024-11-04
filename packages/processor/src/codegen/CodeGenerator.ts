import BaseCodeGenerator, { CodegenResult, Code, Identifier } from '@/chainspec/BaseCodeGenerator';
import {
  isPrimitiveType,
  type ArrayType,
  type EnumType,
  type MapType,
  type OptionType,
  type PrimitiveType,
  type RangeType,
  type ResolvedType,
  type StructType,
  type TupleType,
} from './Parser';

const nameToIdentifier = (name: string): string =>
  name
    .replace(/(?:::|_)(.)/g, (_, c: string) => c.toUpperCase())
    .replace(/^./, (c) => c.toLowerCase());

const isNull = (type: ResolvedType) => type.type === 'primitive' && type.name === 'null';

const hexString = new Code(
  "z.string().refine((v): v is `0x${string}` => /^0x[\\da-f]*$/i.test(v), { message: 'Invalid hex string' })",
);
const numericString = new Code(
  "z.string().refine((v) => /^\\d+$/.test(v), { message: 'Invalid numeric string' })",
);
const numberOrHex = new Code(
  'z.union([z.number(), hexString, numericString]).transform((n) => BigInt(n))',
);
const accountId = new Code(
  'z.union([hexString, z.string().regex(/^[0-9a-f]+$/).transform<`0x${string}`>((v) => `0x${v}`)]).transform((value) => ss58.encode({ data: value, ss58Format: 2112 }))',
  [new Identifier('* as ss58', '@chainflip/utils/ss58')],
);
const simpleEnum = new Code(
  '<U extends string, T extends readonly [U, ...U[]]>(values: T) => z.object({ __kind: z.enum(values) }).transform(({ __kind }) => __kind!)',
);

const shortChainToLongChain = {
  Arb: 'Arbitrum',
  Btc: 'Bitcoin',
  Eth: 'Ethereum',
  Dot: 'Polkadot',
  Sol: 'Solana',
} as const;

const chainEnumMember = (name: keyof typeof shortChainToLongChain, transform?: string) =>
  `z.object({ __kind: z.literal('${name}'), value: hexString }).transform(({ value }) => ({
  chain: '${shortChainToLongChain[name]}' as const,
  address: ${transform ?? 'value'},
}))`;

export default class CodeGenerator extends BaseCodeGenerator {
  private generateEncodedAddressEnum(def: EnumType): Identifier {
    this.registry.types.set('hexString', hexString);

    const dependencies: Identifier[] = [];

    const unionMembers = def.values.map((v) => {
      switch (v.name) {
        case 'Arb':
        case 'Eth':
          return chainEnumMember(v.name);
        case 'Dot':
          dependencies.push(new Identifier('* as ss58', '@chainflip/utils/ss58'));
          return chainEnumMember(v.name, `ss58.encode({ data: value, ss58Format: 0 })`);
        case 'Btc':
          return chainEnumMember(v.name, `Buffer.from(value.slice(2), 'hex').toString('utf8')`);
        case 'Sol':
          dependencies.push(
            new Identifier('* as base58', '@chainflip/utils/base58'),
            new Identifier('hexToBytes', '@chainflip/utils/bytes'),
          );
          return chainEnumMember(v.name, `base58.encode(hexToBytes(value))`);
        default:
          throw new Error(`unknown chain: "${v.name}"`);
      }
    });

    const generated = `z.union([${unionMembers.join(',')}])`;

    this.registry.types.set(def.name, new Code(generated, dependencies));

    return new Identifier(def.name);
  }

  protected override generatePrimitive(def: PrimitiveType): CodegenResult {
    switch (def.name) {
      case 'i8':
      case 'u8':
      case 'i16':
      case 'u16':
      case 'i32':
      case 'u32':
      case 'Percent':
      case 'Permill':
        return new Code('z.number()');
      case 'u64':
      case 'u128':
      case 'U256':
        this.registry.types.set('numericString', numericString);
        this.registry.types.set('hexString', hexString);
        this.registry.types.set('numberOrHex', numberOrHex);
        return new Identifier('numberOrHex');
      case 'AccountId32':
        this.registry.types.set('hexString', hexString);
        this.registry.types.set('accountId', accountId);
        return new Identifier('accountId');
      case 'H160':
      case 'H256':
        this.registry.types.set('hexString', hexString);
        return new Identifier('hexString');
      case 'Call':
        // we would need to parse the calls as well
        return new Code('z.unknown()');
      case 'Bytes':
        this.registry.types.set('hexString', hexString);
        return new Identifier('hexString');
      case 'bool':
        return new Code('z.boolean()');
      case 'null':
        return new Code('z.null()');
    }

    throw new Error(`Unsupported primitive: ${def.name}`);
  }

  protected override generateEnum(def: EnumType): Identifier {
    if (this.registry.types.has(def.name)) return new Identifier(def.name);

    if (def.name === 'cfChainsAddressEncodedAddress') {
      return this.generateEncodedAddressEnum(def);
    }

    // "isSimple" means that none of the variants have any associated data, e.g.
    // `enum Foo { A, B, C }` and not `enum Foo { A(u32), B { field: u32 }, C }`
    const isSimple = def.values.every((v) => isNull(v.value));
    // sometimes there will be empty placeholders, we can ignore these
    const values = def.values.filter((n) => !n.name.startsWith('__Unused'));

    let generated: string;
    const dependencies: CodegenResult[] = [];

    if (isSimple) {
      this.registry.types.set('simpleEnum', simpleEnum);
      generated = `simpleEnum([${values.map((v) => `'${v.name}'`).join(', ')}])`;
    } else {
      const members = values.map((v) => {
        if (isNull(v.value)) {
          return `z.object({ __kind: z.literal('${v.name}') })`;
        }

        // if the struct has no name, it is not actually a struct but an enum variant w/ named fields
        if (v.value.type === 'struct' && v.value.name === undefined) {
          const value = this.generateStruct({
            ...v.value,
            additionalFields: {
              __kind: `z.literal('${v.name}')`,
            },
          });

          dependencies.push(value);

          return value.toString();
        }

        const value = this.generateResolvedType(v.value);

        dependencies.push(value);

        return `z.object({ __kind: z.literal('${v.name}'), value: ${value.toString()} })`;
      });

      if (members.length === 1) {
        [generated] = members;
      } else {
        generated = `z.union([${members.join(', ')}])`;
      }
    }

    this.registry.types.set(def.name, new Code(generated, dependencies));

    return new Identifier(def.name);
  }

  protected override generateStruct(def: StructType): CodegenResult {
    const structIdent = def.name && nameToIdentifier(def.name);

    if (structIdent && this.registry.types.has(structIdent)) {
      return new Identifier(structIdent);
    }

    const dependencies: CodegenResult[] = [];

    const code = new Code(
      `z.object({ ${Object.entries(def.additionalFields ?? {})
        .map(([key, value]) => `${key}: ${value}`)
        .concat(
          Object.entries(def.fields)
            .filter(([, value]) => !isNull(value))
            .map(([key, value]) => {
              const resolvedType = this.generateResolvedType(value);
              dependencies.push(resolvedType);

              if (resolvedType instanceof Identifier) {
                const identifier = resolvedType.toString();

                if (identifier === key) return key;

                return `${key}: ${identifier}`;
              }

              return `${key}: ${resolvedType.toString()}`;
            }),
        )
        .join(', ')} })`,
      dependencies,
    );

    if (!structIdent) return code;

    this.registry.types.set(structIdent, code);

    return new Identifier(structIdent);
  }

  protected override generateArray(def: ArrayType): CodegenResult {
    if (def.length) {
      if (isPrimitiveType(def.value) && def.value.name === 'u8') {
        this.registry.types.set('hexString', hexString);
        return new Identifier('hexString');
      }

      const resolvedType = this.generateResolvedType(def.value);

      const dependencies = Array.from({ length: def.length }, () => resolvedType);

      return new Code(`z.tuple([${dependencies.join(', ')}])`, [resolvedType]);
    }

    const resolvedType = this.generateResolvedType(def.value);
    const dependencies =
      resolvedType instanceof Identifier ? [resolvedType] : [...resolvedType.dependencies];
    return new Code(`z.array(${resolvedType.toString()})`, dependencies);
  }

  protected override generateTuple(def: TupleType): Code {
    const dependencies = def.values.map((t) => {
      const resolvedType = this.generateResolvedType(t);
      return resolvedType;
    });

    return new Code(`z.tuple([${dependencies.join(', ')}])`, dependencies);
  }

  protected override generateOption(def: OptionType): Code {
    const resolvedType = this.generateResolvedType(def.value);
    return new Code(`${resolvedType.toString()}.nullish()`, [resolvedType]);
  }

  protected override generateRange(def: RangeType): Code {
    const resolvedType = this.generateResolvedType(def.value);
    return new Code(
      `z.object({ start: ${resolvedType.toString()}, end: ${resolvedType.toString()} })`,
      [resolvedType],
    );
  }

  protected override generateMap(def: MapType): Code {
    const keyType = this.generateResolvedType(def.key);
    const valueType = this.generateResolvedType(def.value);
    return new Code(`z.array(z.tuple([${keyType.toString()}, ${valueType.toString()}]))`, [
      keyType,
      valueType,
    ]);
  }

  protected override getParserName(palletName: string, itemName: string): string {
    return `${palletName}.${itemName}`;
  }

  protected override getName(palletName: string, itemName: string): string {
    return `${palletName}::${itemName}`
      .replace(/(?:::|_)(.)/g, (_, c: string) => c.toUpperCase())
      .replace(/^./, (c) => c.toLowerCase());
  }

  protected override getGlobalImports(): string[] {
    return ["import { z } from 'zod';"];
  }
}
