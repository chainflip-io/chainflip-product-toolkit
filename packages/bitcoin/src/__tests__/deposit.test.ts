import * as base58 from '@chainflip/utils/base58';
import { bytesToHex, hexToBytes } from '@chainflip/utils/bytes';
import { assetContractId } from '@chainflip/utils/chainflip';
import { describe, expect, it, vi } from 'vitest';
import { findVaultSwapData } from '../deposit';

const mockFetch = (data: unknown) => {
  vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve({ id: 1, jsonrpc: '2.0', result: data }),
  } as Response);
};

describe(findVaultSwapData, () => {
  it.each([
    ['Eth', hexToBytes('0xa56a6be23b6cf39d9448ff6e897c29c41c8fbdff'), 0, 0],
    ['ArbEth', hexToBytes('0xa56a6be23b6cf39d9448ff6e897c29c41c8fbdff'), 1, 2],
    ['Sol', base58.decode('A8dScaeGChTgzvok95uVAxd44LRkq5ckcpppNVQwkLQb'), 0, 0],
  ] as const)(
    'gets the vault swap data (%s)',
    async (asset, addressBytes, chunkIntervalNum, numberOfChunksNum) => {
      const assetId = assetContractId[asset].toString(16).padStart(2, '0');
      const chunkInterval = chunkIntervalNum.toString(16).padStart(4, '0');
      const numberOfChunks = numberOfChunksNum.toString(16).padStart(4, '0');
      const address = bytesToHex(addressBytes).slice(2);

      mockFetch({
        vout: [
          {
            value: 0.005,
            n: 0,
            scriptPubKey: {
              address: 'tb1pjpqkt5ghr3lts922ykufct49trhmkjesmvmrfrq88w7fd0ewwtaq0da2gg',
              type: 'witness_v1_taproot',
            },
          },
          {
            value: 0,
            n: 1,
            scriptPubKey: {
              hex: `6a2f00${assetId}${address}6400e8726c18cdba170000000000000000${numberOfChunks}${chunkInterval}001e0000`,
              type: 'nulldata',
            },
          },
          {
            value: 0.10713908,
            n: 2,
            scriptPubKey: {
              address: 'tb1qhjurnfz4qah4rg7ntue6x287ehdvded20rj9vh',
              type: 'witness_v0_keyhash',
            },
          },
        ],
        blockhash: '0000000000000082c2468c0cf92ade33aba1b00a131df1afe15a70233caff8e9',
      });

      mockFetch({ result: { height: 3902357 }, error: null, id: 1 });

      const data = await findVaultSwapData(
        'https://bitcoin.rpc',
        '77a4dcda118d8cd4e537616effeac741ff60dbdb7af0b7f2f54a3a15c0556239',
      );

      expect(data).not.toBeNull();
      expect(data).toMatchSnapshot();
    },
  );
});
