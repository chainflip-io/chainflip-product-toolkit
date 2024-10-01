/* eslint-disable no-console */
import * as fs from 'fs/promises';
import * as path from 'path';
import { uncapitalize } from '@chainflip/utils/string';
import { ParsedMetadata } from './BaseParser';
import { formatCode } from './utils';

const nameToIdentifier = (name: string): string =>
  name
    .replace(/(?:::|_)(.)/g, (_, c: string) => c.toUpperCase())
    .replace(/^./, (c) => c.toLowerCase());

export abstract class CodegenResult {
  constructor(
    private readonly code: string,
    readonly dependencies: CodegenResult[] = [],
  ) {}

  toString() {
    return this.code;
  }

  abstract getDependencies(): Identifier[];
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
}

export class Code extends CodegenResult {
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

  isCommon() {
    return this.name === 'common';
  }

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

export default abstract class CodeGenerator<T> {
  protected registry = {
    types: new Map<string, CodegenResult>(),
  };

  private trackedItems?: Set<string>;

  constructor({ trackedItems }: { trackedItems?: Set<string> } = {}) {
    if (trackedItems) this.trackedItems = new Set(trackedItems);
  }

  protected abstract generateResolvedType(event: T): CodegenResult;

  protected abstract getName(palletName: string, itemName: string): string;

  *generate(def: ParsedMetadata<T>) {
    const unhandledEvents = new Set(this.trackedItems);
    const generatedEvents = new Set<string>();

    for (const [palletName, events] of Object.entries(def)) {
      for (const [itemName, event] of Object.entries(events)) {
        const name = this.getName(palletName, itemName);
        if (this.trackedItems && !unhandledEvents.delete(name)) continue;
        generatedEvents.add(name);

        let generatedCode: CodegenResult;

        try {
          generatedCode = this.generateResolvedType(event);
        } catch (e) {
          console.error(`failed to parse: ${name}`);
          console.error(JSON.stringify(event, null, 2));
          console.error(e);
          throw e;
        }

        const parserName = nameToIdentifier(`${palletName}::${itemName}`);

        yield new Module(itemName, new Map([[parserName, generatedCode]]), palletName);
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
