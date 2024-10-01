import { Queue } from '@chainflip/utils/async';
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

  getDir() {
    return path.dirname(this.path);
  }
}

export const specVersionCache = new SpecVersionCache(
  path.join(import.meta.dirname, '..', 'metadata', 'specVersion.json'),
);

export const networkToRpcUrl: Record<Network, string> = {
  mainnet: 'https://archive.mainnet.chainflip.io',
  perseverance: 'https://archive.perseverance.chainflip.io',
  sisyphos: 'https://archive.sisyphos.chainflip.io',
  backspin: 'https://backspin-rpc.staging',
  localnet: 'http://127.0.0.1:9944',
};
