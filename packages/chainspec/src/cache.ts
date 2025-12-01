import { HttpClient } from '@chainflip/rpc';
import { Queue } from '@chainflip/utils/async';
import { TypeRegistry, Metadata } from '@polkadot/types';
import * as fs from 'fs/promises';
import * as path from 'path';
import { z } from 'zod';

const cacheSchema = z.record(
  z.object({
    hash: z.string(),
    network: z.enum(['mainnet', 'perseverance', 'sisyphos', 'backspin', 'localnet']),
  }),
);

export type Network = z.output<typeof cacheSchema>[string]['network'];

export const networkToRpcUrl: Record<Network, string> = {
  mainnet: 'https://archive.mainnet.chainflip.io',
  perseverance: 'https://archive.perseverance.chainflip.io',
  sisyphos: 'https://archive.sisyphos.chainflip.io',
  backspin: 'https://rpc.backspin.chainflip.io',
  localnet: 'http://127.0.0.1:9944',
};

export class SpecVersionCache {
  private contents?: Record<string, { hash?: string; network: Network }>;

  private readonly queue = new Queue();

  constructor(private readonly filePath: string) {}

  async read(): Promise<Record<string, { hash?: string; network: Network }>> {
    const contents = JSON.parse(
      await fs.readFile(this.filePath, 'utf8').catch(() => '{}'),
    ) as unknown;

    this.contents ??= cacheSchema.parse(contents);

    return this.contents;
  }

  protected async write(id: number, hash: string, network: Network): Promise<void> {
    return this.queue.enqueue(async () => {
      const data = await this.read();
      data[id] = { hash, network };
      await fs.mkdir(path.dirname(this.filePath), { recursive: true });
      await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
    });
  }

  protected async persistMetadata(
    specVersion: number,
    filePath: string,
    bytes: Uint8Array,
  ): Promise<void> {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, bytes);

    // remove other cached files for the same chainspec
    for (const file of await fs.readdir(this.getDir())) {
      if (file.startsWith(`${specVersion}-`) && file !== path.basename(filePath)) {
        await fs.rm(path.join(this.getDir(), file)).catch(() => null);
      }
    }
  }

  protected async fetchSpecVersion(hash: string, network: Network) {
    const client = new HttpClient(networkToRpcUrl[network]);

    const { specVersion } = await client.sendRequest('state_getRuntimeVersion', hash);

    return specVersion;
  }

  private async getVersion(hash: string, network: Network) {
    const data = await this.read();
    const [version] =
      Object.entries(data).find(([, d]) => d.hash === hash && d.network === network) ?? [];
    return version !== undefined ? Number(version) : undefined;
  }

  async getMetadataAndVersion(network: Network, maybeHash?: string) {
    let specVersion;
    let hash;
    const client = new HttpClient(networkToRpcUrl[network]);

    if (maybeHash) {
      hash = maybeHash;
      specVersion = await this.getVersion(maybeHash, network);
    } else {
      hash = await client.sendRequest('chain_getBlockHash');
    }

    if (!specVersion) {
      specVersion = await this.fetchSpecVersion(hash, network);
      await this.write(specVersion, hash, network);
    }

    // check if we already have the metadata cached for this hash and chainspec
    const filePath = path.join(this.getDir(), `${specVersion}-${hash.slice(2, 8)}.scale`);

    let bytes = await fs.readFile(filePath).catch(() => null);

    if (!bytes) {
      const metadata = await client.sendRequest('state_getMetadata', hash);

      bytes = Buffer.from(metadata.slice(2), 'hex');

      await this.persistMetadata(specVersion, filePath, bytes);
    }

    const registry = new TypeRegistry();
    const metadata = new Metadata(registry, bytes);
    registry.setMetadata(metadata);

    return { specVersion, metadata };
  }

  getDir() {
    return path.dirname(this.filePath);
  }
}

export const specVersionCache = new SpecVersionCache(
  path.join(
    typeof __dirname !== 'undefined' ? __dirname : import.meta.dirname,
    '..',
    'metadata',
    'specVersion.json',
  ),
);
