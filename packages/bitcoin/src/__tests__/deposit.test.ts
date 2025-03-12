import { describe, expect, it, vi } from 'vitest';
import { findVaultSwapData } from '../deposit';

describe(findVaultSwapData, () => {
  it('gets the vault swap data', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          result:
            '02000000000101bcf06adb215e605291ae1fbcde6bbc53543533f7acca1d8afa2feb64929edd800200000000fdffffff0320a1070000000000225120904165d1171c7eb8154a25b89c2ea558efbb4b30db36348c073bbc96bf2e72fa0000000000000000316a2f0001a56a6be23b6cf39d9448ff6e897c29c41c8fbdff6400e8726c18cdba17000000000000000000010002001e0000347ba30000000000160014bcb839a455076f51a3d35f33a328fecddac6e5aa024830450221009e6b191dbbd9c3667f22ad81b58d3e92da4d21fb936a8d780fb023bc8b54385402203830b67ad412777824a6e1c94c4737ac100e6185cf61da0e1db5c4dd876135a8012103c30300031d5a5142c3db4194a77c81086ba11eaeed01b1049b9f767f76f7fa9900000000',
          error: null,
          id: 1,
        }),
    } as Response);

    const data = await findVaultSwapData(
      'https://bitcoin.rpc',
      '77a4dcda118d8cd4e537616effeac741ff60dbdb7af0b7f2f54a3a15c0556239',
      'perseverance',
    );

    expect(data).toMatchInlineSnapshot(`
      {
        "affiliateFees": [],
        "amount": 500000n,
        "brokerFee": 0,
        "ccmDepositMetadata": null,
        "dcaParams": {
          "chunkInterval": 2,
          "numberOfChunks": 1,
        },
        "depositAddress": "tb1pjpqkt5ghr3lts922ykufct49trhmkjesmvmrfrq88w7fd0ewwtaq0da2gg",
        "depositChainBlockHeight": 0,
        "destinationAddress": "0xa56a6be23b6cf39d9448ff6e897c29c41c8fbdff",
        "inputAsset": "Btc",
        "maxBoostFee": 30,
        "outputAsset": "Eth",
        "refundParams": {
          "minPrice": 4545705898455570139320688941272888179569345734748n,
          "refundAddress": "tb1qhjurnfz4qah4rg7ntue6x287ehdvded20rj9vh",
          "retryDuration": 100,
        },
      }
    `);
  });
});
