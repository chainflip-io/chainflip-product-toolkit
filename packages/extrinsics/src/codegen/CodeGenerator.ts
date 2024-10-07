import { capitalize } from '@chainflip/utils/string';
import BaseCodeGenerator, { CodegenResult, Code, Identifier } from '@/chainspec/BaseCodeGenerator';
import {
  ArrayType,
  EnumType,
  MapType,
  OptionType,
  PrimitiveType,
  RangeType,
  ResolvedType,
  StructType,
  TupleType,
} from '@/chainspec/BaseParser';
import assert from 'assert';

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
    switch (def.name) {
      case 'u8':
      case 'u16':
      case 'u32':
        return new Code('number').asType();
      case 'u128':
      case 'U256':
      case 'Bytes':
      case 'AccountId32':
        return new Code('`0x${string}`').asType();
      case 'H160':
        return new Code('number[]').asType();
      default:
        throw new Error(`Method not implemented for primitive type: ${def.name}`);
    }
  }

  protected override generateEnum(def: EnumType): CodegenResult {
    const identifier = this.getKnownIdentifier(def.name);
    if (this.registry.types.has(identifier)) return new Identifier(identifier).asType();

    const isSimpleEnum = def.values.every(
      (value) => value.value.type === 'primitive' && value.value.name === 'null',
    );

    let members: CodegenResult[];

    if (isSimpleEnum) {
      members = def.values
        .filter((value) => !value.name.startsWith('__Unused'))
        .map((value) => new Code(`'${value.name}'`).asType());
    } else {
      members = def.values.map((value) => {
        const result = this.generateResolvedType(value.value);
        return new Code(`Record<'${value.name}', ${result.toString()}>`, [result]).asType();
      });
    }

    const code = new Code(members.join(' | '), members).asType();
    this.registry.types.set(identifier, code);
    return new Identifier(identifier).asType();
  }

  protected override generateStruct(def: StructType): CodegenResult {
    const fields: string[] = [];
    const dependencies: CodegenResult[] = [];
    for (const [name, type] of Object.entries(def.fields)) {
      const result = this.generateResolvedType(type);
      dependencies.push(result);
      fields.push(`${name}: ${result.toString()}`);
    }
    return new Code(`{\n${fields.join(',\n')}\n}`, dependencies).asType();
  }

  protected override generateArray(def: ArrayType): CodegenResult {
    if (def.value.type === 'primitive' && def.value.name === 'u8') {
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

  protected override generateMap(_def: MapType): CodegenResult {
    throw new Error('Method not implemented.');
  }

  protected override generateItem(itemName: string, def: ResolvedType): CodegenResult {
    const type = this.generateResolvedType(def);
    assert(def.type === 'struct', `Expected struct, got ${def.type}`);
    assert(type instanceof Code, `Expected code, got ${type[Symbol.toStringTag]()}`);
    // change struct to named tuple
    return new Code(`[${type.code.slice(1, -1)}]`, type.dependencies).asType();
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
