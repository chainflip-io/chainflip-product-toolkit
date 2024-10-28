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
  backspin: 'https://backspin-rpc.staging',
  localnet: 'http://127.0.0.1:9944',
};

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

  private async write(id: number, hash: string, network: Network): Promise<void> {
    return this.queue.enqueue(async () => {
      const data = await this.read();
      data[id] = { hash, network };
      await fs.writeFile(this.path, JSON.stringify(data, null, 2));
    });
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
      ({ specVersion } = await client.sendRequest('state_getRuntimeVersion', hash));
      await this.write(specVersion, hash, network);
    }

    const filePath = path.join(this.getDir(), `${specVersion}.scale`);

    let bytes = await fs.readFile(filePath).catch(() => null);

    if (!bytes) {
      const metadata = await client.sendRequest('state_getMetadata', hash);

      bytes = Buffer.from(metadata.slice(2), 'hex');

      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, bytes);
    }

    const registry = new TypeRegistry();
    const metadata = new Metadata(registry, bytes);
    registry.setMetadata(metadata);

    return { specVersion, metadata };
  }

  getDir() {
    return path.dirname(this.path);
  }
}

export const specVersionCache = new SpecVersionCache(
  path.join(import.meta.dirname, '..', 'metadata', 'specVersion.json'),
);
