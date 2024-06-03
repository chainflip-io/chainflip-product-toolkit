import * as path from 'path';
import * as prettier from 'prettier';
import * as fs from 'fs/promises';
import { z } from 'zod';
import { ParsedMetadata } from './Parser';
import { Queue } from '@chainflip/utils/async';

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
// a function to deep diff two metadata objects
function* diff(
  a: any,
  b: any,
  path: string[] = [],
): Generator<{ path: string[]; type: 'added' | 'removed' | 'changed' }> {
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

export const diffSpecs = (a: ParsedMetadata, b: ParsedMetadata) => {
  const changedOrAddedEvents = new Set<string>();

  for (const change of diff(a, b)) {
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

  return changedOrAddedEvents;
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
    network: z.enum(['mainnet', 'perseverance', 'sisyphos', 'backspin']),
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
  path.join(import.meta.dirname, '..', 'metadata', 'specVersion.json'),
);

export const networkToRpcUrl: Record<Network, string> = {
  mainnet: 'https://mainnet-archive.chainflip.io',
  perseverance: 'https://archive.perseverance.chainflip.io',
  sisyphos: 'https://archive.sisyphos.chainflip.io',
  backspin: 'https://backspin-rpc.staging',
};
