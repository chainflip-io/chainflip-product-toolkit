import * as crypto from 'crypto';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs/promises';
import { beforeEach, describe, expect, it } from 'vitest';

import { SpecVersionCache } from '../cache';

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

  describe(SpecVersionCache.prototype['write'], () => {
    it('updates the cache', async () => {
      await specVersionCache['write'](1, 'hash', 'mainnet');
      expect(await fs.readFile(cachePath, 'utf8')).toEqual(
        JSON.stringify({ '1': { hash: 'hash', network: 'mainnet' } }, null, 2),
      );
    });
  });

  describe(SpecVersionCache.prototype['getVersion'], () => {
    it('finds the version for a hash and network', async () => {
      await specVersionCache['write'](1, 'hash', 'mainnet');
      expect(await specVersionCache['getVersion']('hash', 'mainnet')).toEqual(1);
    });

    it('returns undefined for unknown versions', async () => {
      expect(await specVersionCache['getVersion']('hash', 'mainnet')).toBeUndefined();
    });
  });

  describe(SpecVersionCache.prototype.getDir, () => {
    it('returns the directory of the cache', () => {
      expect(specVersionCache.getDir()).toEqual(path.dirname(cachePath));
    });
  });
});
