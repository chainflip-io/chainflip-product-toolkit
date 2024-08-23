import { Queue } from '@chainflip/utils/async';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as prettier from 'prettier';
import { z } from 'zod';
import { ParsedMetadata } from './Parser';
import assert from 'assert';

type ChangeType = 'added' | 'removed' | 'changed';
type Change = { path: string[]; type: ChangeType };

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
// a function to deep diff two metadata objects
function* diff(a: any, b: any, path: string[] = []): Generator<Change> {
  const addedKeys = Object.keys(b)
    .filter((key) => b[key] !== undefined)
    .filter((key) => !a[key]);
  const removedKeys = Object.keys(a)
    .filter((key) => a[key] !== undefined)
    .filter((key) => !b[key]);
  const commonKeys = Object.keys(a)
    .filter((key) => a[key] !== undefined)
    .filter((key) => b[key]);

  for (const key of addedKeys) {
    yield { path: [...path, key], type: 'added' };
  }

  for (const key of removedKeys) {
    yield { path: [...path, key], type: 'removed' };
  }

  for (const key of commonKeys) {
    if (typeof a[key] === 'object' && typeof b[key] === 'object') {
      yield* diff(a[key], b[key], [...path, key]);
    } else if (a[key] !== b[key]) {
      yield { path: [...path, key], type: 'changed' };
    }
  }
}
/* eslint-enable @typescript-eslint/no-unsafe-member-access */
/* eslint-enable @typescript-eslint/no-unsafe-argument */

class ChangelogGenerator {
  addedOrRemovedPallets: Record<string, 'added' | 'removed'> = {};

  changedEvents: Record<
    `${string}.${string}`,
    { field: string; type: 'added' | 'changed' | 'removed' }[]
  > = {};
  addedOrRemovedEvents: Record<`${string}.${string}`, 'added' | 'removed'> = {};

  trackedFieldChanges = new Set<string>();

  add({ path, type }: Change) {
    if (path.length === 1) {
      assert(type === 'added' || type === 'removed');
      this.addedOrRemovedPallets[path[0]] = type;
    } else if (path.length === 2) {
      const name = `${path[0]}.${path[1]}` as const;
      assert(type === 'added' || type === 'removed');
      this.addedOrRemovedEvents[name] = type;
    } else {
      const [pallet, event, , field] = path;
      const id = `${pallet}.${event}.${field}`;
      if (this.trackedFieldChanges.has(id)) return;
      this.trackedFieldChanges.add(id);
      (this.changedEvents[`${pallet}.${event}`] ??= []).push({ field, type });
    }
  }

  toString() {
    const lines: string[] = [];

    const pallets = Object.keys(this.addedOrRemovedPallets).sort();

    if (pallets.length) lines.push('New or removed pallets:');
    for (const pallet of pallets) {
      lines.push(`  ${pallet}: ${this.addedOrRemovedPallets[pallet]}`);
    }

    const events = Object.keys(this.addedOrRemovedEvents)
      .concat(Object.keys(this.changedEvents))
      .sort() as `${string}.${string}`[];

    let currentPallet = '';
    for (const event of events) {
      const [pallet, name] = event.split('.');
      if (pallet !== currentPallet) {
        if (currentPallet) lines.push('');
        currentPallet = pallet;
        lines.push(`${pallet}:`);
      }
      if (event in this.addedOrRemovedEvents) {
        lines.push(`  - ${name}: ${this.addedOrRemovedEvents[event]}`);
      } else {
        lines.push(`  - ${name}:`);
        const fields = this.changedEvents[event].map(
          ({ field, type }) => `    - ${field}: ${type}`,
        );
        lines.push(...fields);
      }
    }

    lines.push('');
    return lines.join('\n');
  }
}

export const diffSpecs = (a: ParsedMetadata, b: ParsedMetadata) => {
  const changedOrAddedEvents = new Set<string>();
  const changelog = new ChangelogGenerator();

  for (const change of diff(a, b)) {
    changelog.add(change);

    const [pallet, event, field] = change.path;

    if (event && (field || change.type === 'added')) {
      // if a field changed or a new event was added
      changedOrAddedEvents.add(`${pallet}.${event}`);
    } else if (change.type === 'added') {
      // if a new pallet was added
      Object.keys(b[pallet])
        .map((e) => `${pallet}.${e}`)
        .forEach((ev) => changedOrAddedEvents.add(ev), changedOrAddedEvents);
    }
  }

  return { changedOrAddedEvents, changelog: changelog.toString() };
};

export const formatCode = (code: string) =>
  prettier.format(code, {
    parser: 'typescript',
    singleQuote: true,
    trailingComma: 'all',
    printWidth: 100,
  });

const cacheSchema = z.record(
  z.object({
    hash: z.string(),
    network: z.enum(['mainnet', 'perseverance', 'sisyphos', 'backspin', 'localnet']),
  }),
);
export type Network = z.output<typeof cacheSchema>[string]['network'];

export class SpecVersionCache {
  private contents?: z.output<typeof cacheSchema>;

  private readonly queue = new Queue();

  constructor(private readonly path: string) {}

  async read(): Promise<z.output<typeof cacheSchema>> {
    const contents = JSON.parse(
      await fs.readFile(this.path, 'utf8').catch(async () => {
        await fs.mkdir(path.dirname(this.path), { recursive: true });
        return '{}';
      }),
    ) as unknown;

    this.contents ??= cacheSchema.parse(contents);

    return this.contents;
  }

  async write(id: number, hash: string, network: Network): Promise<void> {
    return this.queue.enqueue(async () => {
      const data = await this.read();
      data[id] = { hash, network };
      await fs.writeFile(this.path, JSON.stringify(data, null, 2));
    });
  }

  async getVersion(hash: string, network: Network) {
    const data = await this.read();
    const [version] =
      Object.entries(data).find(([, d]) => d.hash === hash && d.network === network) ?? [];
    return version !== undefined ? Number(version) : undefined;
  }
}

export const specVersionCache = new SpecVersionCache(
  path.join(import.meta.dirname, '..', '..', 'metadata', 'specVersion.json'),
);

export const networkToRpcUrl: Record<Network, string> = {
  mainnet: 'https://rpc.mainnet.chainflip.io',
  perseverance: 'https://archive.perseverance.chainflip.io',
  sisyphos: 'https://archive.sisyphos.chainflip.io',
  backspin: 'https://backspin-rpc.staging',
  localnet: 'http://127.0.0.1:9944',
};
