import * as crypto from 'crypto';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs/promises';
import { beforeEach, describe, expect, it } from 'vitest';
import { SpecVersionCache, diffSpecs } from '../utils';
import { ParsedMetadata } from '../Parser';

describe(diffSpecs, () => {
  it('returns an empty set if nothing has changed', () => {
    const a: ParsedMetadata = { pallet1: { event1: { type: 'primitive', name: 'u64' } } };

    const { changedOrAddedEvents, changelog } = diffSpecs(a, a);
    expect(changedOrAddedEvents).toEqual(new Set());
    expect(changelog).toMatchInlineSnapshot(`""`);
  });

  it('returns a set of changed events', () => {
    const a: ParsedMetadata = { pallet1: { event1: { type: 'primitive', name: 'u64' } } };
    const b: ParsedMetadata = {
      pallet1: {
        event1: {
          type: 'tuple',
          values: [
            {
              type: 'primitive',
              name: 'u64',
            },
          ],
        },
      },
    };

    const { changedOrAddedEvents, changelog } = diffSpecs(a, b);
    expect(changedOrAddedEvents).toEqual(new Set(['pallet1.event1']));
    expect(changelog).toMatchInlineSnapshot(`
      "pallet1:
        - event1:
          - undefined: added
      "
    `);
  });

  it('returns a set of added events', () => {
    const a: ParsedMetadata = { pallet1: { event1: { type: 'primitive', name: 'u64' } } };
    const b: ParsedMetadata = {
      pallet1: {
        event1: { type: 'primitive', name: 'u64' },
        event2: { type: 'primitive', name: 'u64' },
      },
    };

    const { changedOrAddedEvents, changelog } = diffSpecs(a, b);
    expect(changedOrAddedEvents).toEqual(new Set(['pallet1.event2']));
    expect(changelog).toMatchInlineSnapshot(`
      "pallet1:
        - event2: added
      "
    `);
  });

  it('returns a set of changed and added events', () => {
    const a: ParsedMetadata = { pallet1: { event1: { type: 'primitive', name: 'u64' } } };
    const b: ParsedMetadata = {
      pallet1: {
        event1: {
          type: 'tuple',
          values: [
            {
              type: 'primitive',
              name: 'u64',
            },
          ],
        },
        event2: { type: 'primitive', name: 'u64' },
      },
    };

    const { changedOrAddedEvents, changelog } = diffSpecs(a, b);
    expect(changedOrAddedEvents).toEqual(new Set(['pallet1.event1', 'pallet1.event2']));
    expect(changelog).toMatchInlineSnapshot(`
      "pallet1:
        - event1:
          - undefined: added
        - event2: added
      "
    `);
  });

  it('returns all the events from a new pallet', () => {
    const a: ParsedMetadata = { pallet1: { event1: { type: 'primitive', name: 'u64' } } };
    const b: ParsedMetadata = {
      ...a,
      pallet2: {
        event1: { type: 'primitive', name: 'u64' },
        event2: { type: 'primitive', name: 'u64' },
        event3: { type: 'primitive', name: 'u64' },
      },
    };

    const { changedOrAddedEvents, changelog } = diffSpecs(a, b);
    expect(changedOrAddedEvents).toEqual(
      new Set(['pallet2.event1', 'pallet2.event2', 'pallet2.event3']),
    );
    expect(changelog).toMatchInlineSnapshot(`
      "New or removed pallets:
        pallet2: added

      "
    `);
  });
});

describe(SpecVersionCache, () => {
  let specVersionCache: SpecVersionCache;
  let cachePath: string;

  beforeEach(async () => {
    cachePath = path.join(
      os.tmpdir(),
      'spec-version-cache',
      `cache-${crypto.randomBytes(8).toString('hex')}.json`,
    );
    await fs.rm(cachePath, { force: true, recursive: true });
    specVersionCache = new SpecVersionCache(cachePath);
  });

  describe(SpecVersionCache.prototype.read, () => {
    it('creates the cache', async () => {
      expect(await specVersionCache.read()).toEqual({});
    });

    it('reads an existing cache', async () => {
      await fs.mkdir(path.dirname(cachePath), { recursive: true });
      const expected = { 1: { hash: 'hash', network: 'mainnet' } };
      await fs.writeFile(cachePath, JSON.stringify(expected));
      expect(await specVersionCache.read()).toEqual(expected);
    });
  });

  describe(SpecVersionCache.prototype.write, () => {
    it('updates the cache', async () => {
      await specVersionCache.write(1, 'hash', 'mainnet');
      expect(await fs.readFile(cachePath, 'utf8')).toEqual(
        JSON.stringify({ '1': { hash: 'hash', network: 'mainnet' } }, null, 2),
      );
    });
  });

  describe(SpecVersionCache.prototype.getVersion, () => {
    it('finds the version for a hash and network', async () => {
      await specVersionCache.write(1, 'hash', 'mainnet');
      expect(await specVersionCache.getVersion('hash', 'mainnet')).toEqual(1);
    });
  });
});
