import { capitalize } from '@chainflip/utils/string';
import assert from 'assert';
import BaseCodeGenerator, {
  type CodegenResult,
  Code,
  Identifier,
} from '@/chainspec/BaseCodeGenerator';
import {
  type ArrayType,
  type EnumType,
  type MapType,
  type OptionType,
  type PrimitiveType,
  type RangeType,
  type ResolvedType,
  type StructType,
  type TupleType,
} from '@/chainspec/BaseParser';

class NoArgs extends Code {
  constructor() {
    super('NO_ARGS');
  }

  override toString() {
    return '[]';
  }
}

class Struct extends Code {
  as: 'tuple' | 'record' = 'record';
  declarationType: 'type' | 'const' = 'type';

  constructor(private readonly fields: (readonly [string, CodegenResult])[]) {
    super(
      '',
      fields.map(([, type]) => type),
    );
  }

  asTuple() {
    this.as = 'tuple';
    return this;
  }

  override toString() {
    let open: string;
    let close: string;
    let transform = (name: string) => name;

    if (this.as === 'tuple') {
      open = '[';
      close = ']';
    } else {
      open = '{';
      close = '}';
      transform = (name) => name.replace(/[A-Z]/g, (m) => `_${m.toLowerCase()}`);
    }

    return `${open}\n${this.fields.map(([name, type]) => `${transform(name)}: ${type.toString()}`).join(',\n')}\n${close}`;
  }

  [Symbol.toStringTag]() {
    return 'Struct';
  }
}

export default class CodeGenerator extends BaseCodeGenerator {
  private getKnownIdentifier(name: string): string {
    switch (name) {
      case 'cfPrimitivesChainsAssetsAnyAsset':
        return 'ChainflipAsset';
      case 'cfChainsAddressEncodedAddress':
        return 'EncodedAddress';
      case 'cfChainsAddressForeignChainAddress':
        return 'ForeignChainAddress';
      case 'cfChainsBtcScriptPubkey':
        return 'BitcoinScriptPubKey';
      default:
        return capitalize(name);
    }
  }

  protected override generatePrimitive(def: PrimitiveType): CodegenResult {
    switch (def.value) {
      case 'u8':
      case 'u16':
      case 'u32':
        return new Code('number').asType();
      case 'u64':
      case 'u128':
      case 'U256':
        return new Code('`${number}` | `0x${string}`').asType();
      case 'AccountId32':
        return new Code('`0x${string}`').asType();
      case 'Bytes':
        return new Code('Uint8Array | `0x${string}`').asType();
      case 'H160':
        return new Code('Uint8Array').asType();
      case 'null':
        return new Code('null').asType();
      default:
        throw new Error(`Method not implemented for primitive type: ${def.value}`);
    }
  }

  protected override generateEnum(def: EnumType): CodegenResult {
    const identifier = this.getKnownIdentifier(def.$name);
    if (this.registry.types.has(identifier)) return new Identifier(identifier).asType();

    const members = def.values
      .filter((value) => !value.name.startsWith('__Unused'))
      .map((value) => {
        if (value.value.type === 'primitive' && value.value.value === 'null') {
          return new Code(`'${value.name}'`).asType();
        }

        const result = this.generateResolvedType(value.value);
        return new Code(`{ ${value.name}: ${result.toString()} }`, [result]).asType();
      });

    const code = new Code(members.join(' | '), members).asType();
    this.registry.types.set(identifier, code);
    return new Identifier(identifier).asType();
  }

  protected override generateStruct(def: StructType): CodegenResult {
    const fields = Object.entries(def.fields).map(([name, type]) => {
      const result = this.generateResolvedType(type);
      return [name, result] as const;
    });
    return new Struct(fields);
  }

  protected override generateArray(def: ArrayType): CodegenResult {
    if (def.value.type === 'primitive' && def.value.value === 'u8') {
      return new Code('Uint8Array').asType();
    }

    const type = this.generateResolvedType(def.value);

    return new Code(`${type.toString()}[]`, [type]);
  }

  protected override generateTuple(_def: TupleType): CodegenResult {
    throw new Error('Method not implemented.');
  }

  protected override generateRange(_def: RangeType): CodegenResult {
    throw new Error('Method not implemented.');
  }

  protected override generateOption(def: OptionType): CodegenResult {
    const type = this.generateResolvedType(def.value);
    return new Code(`${type.toString()} | null`, [type]);
  }

  protected override generateMap(def: MapType): CodegenResult {
    assert(def.key.type === 'enum', 'only know how to generate map with enum key');
    const key = this.generateEnum(def.key);
    const value = this.generateResolvedType(def.value);
    return new Code(`Map<{ [key in ${key.toString()}]: {}; }, ${value.toString()}>`, [key, value]);
  }

  protected override generateItem(itemName: string, def: ResolvedType): CodegenResult {
    // if the input type to the extrinsic is `null`, we don't need to pass any
    // args to the call
    if (def.type === 'primitive' && def.value === 'null') return new NoArgs();
    const type = this.generateResolvedType(def);
    assert(def.type === 'struct', `Expected struct, got ${def.type}`);
    assert(type instanceof Struct, `Expected code, got ${type[Symbol.toStringTag]()}`);
    return type.asTuple();
  }

  protected override getParserName(palletName: string, itemName: string): string {
    return `${palletName}.${itemName}`;
  }

  protected override getName(palletName: string, itemName: string): string {
    return `${capitalize(palletName)}${capitalize(itemName).replace(/_(\w)/g, (m, c: string) => c.toUpperCase())}`;
  }

  protected override getFileName(palletName: string, itemName: string): string {
    return itemName.replace(/_(\w)/g, (m, c: string) => c.toUpperCase());
  }
}
