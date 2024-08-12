import * as fs from 'fs/promises';
import * as path from 'path';
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
import { uncapitalize } from '@chainflip/utils/string';
import { unreachable } from '@chainflip/utils/assertion';
import { formatCode } from './utils';

type PalletName = string;
type EventName = string;

const nameToIdentifier = (name: string): string =>
  name
    .replace(/(?:::|_)(.)/g, (_, c: string) => c.toUpperCase())
    .replace(/^./, (c) => c.toLowerCase());

const isNull = (type: ResolvedType) => type.type === 'primitive' && type.name === 'null';

abstract class CodegenResult {
  constructor(
    private readonly code: string,
    readonly dependencies: CodegenResult[] = [],
  ) {}

  toString() {
    return this.code;
  }

  abstract getDependencies(): Identifier[];
}

class Identifier extends CodegenResult {
  constructor(
    identifier: string,
    readonly pkg: string = 'common',
  ) {
    super(identifier);
  }

  getDependencies(): Identifier[] {
    return [this];
  }
}

class Code extends CodegenResult {
  getDependencies(): Identifier[] {
    return this.dependencies.flatMap((d) => d.getDependencies());
  }
}

class Module {
  constructor(
    private readonly name: string,
    private readonly exports: Map<string, CodegenResult>,
    private readonly pallet?: string,
  ) {}

  toString() {
    const generated: string[] = [];

    const dependencies: Record<string, Set<string>> = {};

    for (const [identifier, type] of this.exports.entries()) {
      const exportDeps = type.getDependencies();

      for (const ident of exportDeps) {
        // don't import from the file we are in
        if (ident.pkg === this.name) continue;
        dependencies[ident.pkg] ??= new Set();
        dependencies[ident.pkg].add(ident.toString());
      }

      generated.push(`export const ${identifier} = ${type.toString()};`);
      generated.push('');
    }

    return [
      "import { z } from 'zod';",
      ...Object.entries(dependencies).map(([pkg, depsSet]) => {
        const pkgPath = pkg === 'common' ? '../common' : pkg;

        const deps = [...depsSet];

        const names =
          deps.length === 1 && deps[0].startsWith('*') ? deps[0] : `{ ${deps.sort().join(', ')} }`;

        return `import ${names} from '${pkgPath}';`;
      }),
      '',
      ...generated,
    ].join('\n');
  }

  toFormattedString() {
    return formatCode(this.toString());
  }

  async writeFile(specDir: string) {
    const outDir = this.pallet ? path.join(specDir, uncapitalize(this.pallet)) : specDir;
    await fs.mkdir(outDir, { recursive: true });
    await fs.writeFile(
      path.join(outDir, uncapitalize(`${this.name}.ts`)),
      await this.toFormattedString(),
      'utf8',
    );
  }
}

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

export default class CodeGenerator {
  private registry = {
    types: new Map<string, CodegenResult>(),
  };

  private trackedEvents?: Set<string>;

  constructor({ trackedEvents }: { trackedEvents?: Set<string> } = {}) {
    if (trackedEvents) this.trackedEvents = new Set(trackedEvents);
  }

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

  private generatePrimitive(def: PrimitiveType): CodegenResult {
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

  private generateEnum(def: EnumType): Identifier {
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
      generated = `z.union([${values
        .map((v) => {
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
        })
        .join(', ')}])`;
    }

    this.registry.types.set(def.name, new Code(generated, dependencies));

    return new Identifier(def.name);
  }

  private generateStruct(def: StructType): CodegenResult {
    const identifier = def.name && nameToIdentifier(def.name);

    if (identifier && this.registry.types.has(identifier)) {
      return new Identifier(identifier);
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

    if (!identifier) return code;

    this.registry.types.set(identifier, code);

    return new Identifier(identifier);
  }

  private generateArray(def: ArrayType): CodegenResult {
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

  private generateTuple(def: TupleType): Code {
    const dependencies = def.values.map((t) => {
      const resolvedType = this.generateResolvedType(t);
      return resolvedType;
    });

    return new Code(`z.tuple([${dependencies.join(', ')}])`, dependencies);
  }

  private generateOption(def: OptionType): Code {
    const resolvedType = this.generateResolvedType(def.value);
    return new Code(`${resolvedType.toString()}.nullish()`, [resolvedType]);
  }

  private generateRange(def: RangeType): Code {
    const resolvedType = this.generateResolvedType(def.value);
    return new Code(
      `z.object({ start: ${resolvedType.toString()}, end: ${resolvedType.toString()} })`,
      [resolvedType],
    );
  }

  private generateMap(def: MapType): Code {
    const keyType = this.generateResolvedType(def.key);
    const valueType = this.generateResolvedType(def.value);
    return new Code(`z.array(z.tuple([${keyType.toString()}, ${valueType.toString()}]))`, [
      keyType,
      valueType,
    ]);
  }

  private generateResolvedType(def: ResolvedType): CodegenResult {
    switch (def.type) {
      case 'primitive':
        return this.generatePrimitive(def);
      case 'enum':
        return this.generateEnum(def);
      case 'struct':
        return this.generateStruct(def);
      case 'array':
        return this.generateArray(def);
      case 'tuple':
        return this.generateTuple(def);
      case 'range':
        return this.generateRange(def);
      case 'option':
        return this.generateOption(def);
      case 'map':
        return this.generateMap(def);
      default:
        return unreachable(def, `Unsupported type: ${(def as ResolvedType).type}`);
    }
  }

  *generate(def: Record<PalletName, Record<EventName, ResolvedType>>) {
    const unhandledEvents = new Set(this.trackedEvents);
    const generatedEvents = new Set<string>();

    for (const [palletName, events] of Object.entries(def)) {
      for (const [eventName, event] of Object.entries(events)) {
        const name = `${palletName}.${eventName}`;
        if (this.trackedEvents && !unhandledEvents.delete(name)) continue;
        generatedEvents.add(name);

        let generatedEvent: CodegenResult;

        try {
          generatedEvent = this.generateResolvedType(event);
        } catch (e) {
          console.error(`failed to parse: ${name}`);
          console.error(JSON.stringify(event, null, 2));
          console.error(e);
          throw e;
        }

        const parserName = nameToIdentifier(`${palletName}::${eventName}`);

        yield new Module(eventName, new Map([[parserName, generatedEvent]]), palletName);
      }
    }

    if (unhandledEvents.size !== 0) {
      console.error('Unhandled events:', unhandledEvents);
      throw new Error('Not all events were generated');
    }

    if (generatedEvents.size === 0) return;

    yield new Module('common', new Map(this.registry.types));
  }
}
