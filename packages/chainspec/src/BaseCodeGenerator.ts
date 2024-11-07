/* eslint-disable no-console */
import { unreachable } from '@chainflip/utils/assertion';
import { uncapitalize } from '@chainflip/utils/string';
import * as fs from 'fs/promises';
import * as path from 'path';
import {
  type ArrayType,
  type EnumType,
  type MapType,
  type OptionType,
  type ParsedMetadata,
  type PrimitiveType,
  type RangeType,
  type ResolvedType,
  type StructType,
  type TupleType,
} from './BaseParser';
import { formatCode } from './utils';

export abstract class CodegenResult {
  declarationType: 'type' | 'const' = 'const';

  constructor(
    readonly code: string,
    readonly dependencies: CodegenResult[] = [],
  ) {}

  toString() {
    return this.code;
  }

  asType() {
    this.declarationType = 'type';
    return this;
  }

  abstract getDependencies(): Identifier[];
  abstract [Symbol.toStringTag](): string;
}

export class Identifier extends CodegenResult {
  constructor(
    identifier: string,
    readonly pkg: string = 'common',
  ) {
    super(identifier);
  }

  getDependencies(): Identifier[] {
    return [this];
  }

  [Symbol.toStringTag](): string {
    return 'Identifier';
  }
}

export class Code extends CodegenResult {
  getDependencies(): Identifier[] {
    return this.dependencies.flatMap((d) => d.getDependencies());
  }

  [Symbol.toStringTag](): string {
    return 'Code';
  }
}

class Module {
  constructor(
    private readonly name: string,
    private readonly exports: Map<string, CodegenResult>,
    private readonly globalImports: string[],
    private readonly pallet?: string,
  ) {}

  isCommon() {
    return this.name === 'common';
  }

  toString() {
    const generated: string[] = [];

    const dependencies: Record<string, Map<string, CodegenResult>> = {};

    for (const [identifier, type] of this.exports.entries()) {
      const exportDeps = type.getDependencies();

      for (const ident of exportDeps) {
        // don't import from the file we are in
        if (ident.pkg === this.name) continue;
        dependencies[ident.pkg] ??= new Map();
        dependencies[ident.pkg].set(ident.toString(), ident);
      }

      generated.push(`export ${type.declarationType} ${identifier} = ${type.toString()};`);
      generated.push('');
    }

    return [
      ...this.globalImports,
      ...Object.entries(dependencies).map(([pkg, depsSet]) => {
        const pkgPath = pkg === 'common' ? '../common' : pkg;

        const deps = [...depsSet.entries()]
          .sort(([a], [b]) => (a.toLowerCase() < b.toLowerCase() ? -1 : 1))
          .map(([name, type]) => (type.declarationType === 'const' ? name : `type ${name}`));

        const names =
          deps.length === 1 && deps[0].startsWith('*') ? deps[0] : `{ ${deps.join(', ')} }`;

        return `import ${names} from '${pkgPath}';`;
      }),
      '',
      ...generated,
    ].join('\n');
  }

  toFormattedString() {
    return formatCode(this.toString());
  }

  async writeFile(specDir: string, changelog?: string) {
    const outDir = this.pallet ? path.join(specDir, uncapitalize(this.pallet)) : specDir;
    await fs.mkdir(outDir, { recursive: true });
    await fs.writeFile(
      path.join(outDir, uncapitalize(`${this.name}.ts`)),
      await this.toFormattedString(),
      'utf8',
    );
    if (changelog) await fs.writeFile(path.join(outDir, 'CHANGELOG.md'), changelog, 'utf8');
  }
}

export default abstract class CodeGenerator {
  protected registry = {
    types: new Map<string, CodegenResult>(),
  };

  private trackedItems?: Set<string>;

  constructor({ trackedItems }: { trackedItems?: Set<string> } = {}) {
    if (trackedItems) this.trackedItems = new Set(trackedItems);
  }

  protected abstract generateArray(def: ArrayType): CodegenResult;
  protected abstract generateEnum(def: EnumType): CodegenResult;
  protected abstract generateMap(def: MapType): CodegenResult;
  protected abstract generateOption(def: OptionType): CodegenResult;
  protected abstract generatePrimitive(def: PrimitiveType): CodegenResult;
  protected abstract generateRange(def: RangeType): CodegenResult;
  protected abstract generateStruct(def: StructType): CodegenResult;
  protected abstract generateTuple(def: TupleType): CodegenResult;

  protected generateResolvedType(def: ResolvedType): CodegenResult {
    switch (def.type) {
      case 'array':
        return this.generateArray(def);
      case 'enum':
        return this.generateEnum(def);
      case 'map':
        return this.generateMap(def);
      case 'option':
        return this.generateOption(def);
      case 'primitive':
        return this.generatePrimitive(def);
      case 'range':
        return this.generateRange(def);
      case 'struct':
        return this.generateStruct(def);
      case 'tuple':
        return this.generateTuple(def);
      default:
        return unreachable(def, `Unsupported type: ${(def as ResolvedType).type}`);
    }
  }

  protected generateItem(itemName: string, def: ResolvedType): CodegenResult {
    return this.generateResolvedType(def);
  }

  protected abstract getParserName(palletName: string, itemName: string): string;

  protected getName(palletName: string, itemName: string) {
    return this.getParserName(palletName, itemName);
  }

  protected getGlobalImports(): string[] {
    return [];
  }

  protected getFileName(palletName: string, itemName: string) {
    return itemName;
  }

  *generate(def: ParsedMetadata) {
    const unhandledItems = new Set(this.trackedItems);
    const generatedItems = new Set<string>();

    for (const [palletName, items] of Object.entries(def)) {
      for (const [itemName, item] of Object.entries(items)) {
        const parserName = this.getParserName(palletName, itemName);
        if (this.trackedItems && !unhandledItems.delete(parserName)) continue;
        generatedItems.add(parserName);

        let generatedCode: CodegenResult;

        try {
          generatedCode = this.generateItem(itemName, item);
        } catch (e) {
          console.error(`failed to parse: ${parserName}`);
          console.error(JSON.stringify(item, null, 2));
          console.error(e);
          throw e;
        }

        const name = this.getName(palletName, itemName);

        yield new Module(
          this.getFileName(palletName, itemName),
          new Map([[name, generatedCode]]),
          this.getGlobalImports(),
          palletName,
        );
      }
    }

    if (unhandledItems.size !== 0) {
      console.error('Unhandled items:', unhandledItems);
      throw new Error('Not all items were generated');
    }

    if (generatedItems.size === 0) return;

    yield new Module('common', new Map(this.registry.types), this.getGlobalImports());
  }
}
