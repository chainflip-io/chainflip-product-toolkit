import * as base58 from '@chainflip/utils/base58';
import { hexToBytes } from '@chainflip/utils/bytes';
import { ChainflipAsset } from '@chainflip/utils/chainflip';
import * as ss58 from '@chainflip/utils/ss58';
import { Connection } from '@solana/web3.js';
import { describe, beforeEach, it, vi, expect, type MockInstance } from 'vitest';
import { SolanaCcmAdditionalData } from '@/scale/codecs';
import { spyOn } from '@/testing';
import {
  findTransactionSignatures,
  findVaultSwapData,
  findVaultSwapSignature,
  TransactionMatchingError,
} from '../deposit';
import { mainnet } from '../idls';
import bigDiff from './fixtures/bigDiff.json';
import cluster from './fixtures/cluster.json';
import combineTxs from './fixtures/combineTxs.json';
import devnet from './fixtures/devnet.json';
import doubleTransfer from './fixtures/doubleTransfer.json';
import maxBlockError from './fixtures/maxBlockError.json';
import notVaultSwap from './fixtures/notVaultSwap.json';
import paginate1 from './fixtures/paginate1.json';
import paginate2 from './fixtures/paginate2.json';
import paginate3 from './fixtures/paginate3.json';
import simple from './fixtures/simple.json';
import solusdc from './fixtures/solusdc.json';
import solusdc2 from './fixtures/solusdc2.json';
import { swapNative } from './fixtures/swapNative';
import swapTokenDevnet from './fixtures/swapTokenDevnet.json';
import unsorted from './fixtures/unsorted.json';

const mockFetchWithResponses = (responses: { jsonrpc: string; result: unknown; id: string }[]) =>
  responses.reduce(
    (mock: MockInstance<typeof fetch>, res) =>
      mock.mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: () => Promise.resolve(JSON.stringify(res)),
      } as any),
    spyOn(globalThis, 'fetch'),
  );

describe(findTransactionSignatures, () => {
  const mockFetch = (response: { signatures: any; transactions: any }) =>
    mockFetchWithResponses([response.signatures, response.transactions]);

  beforeEach(() => {
    vi.restoreAllMocks();
    spyOn(globalThis, 'fetch').mockRejectedValue(Error('unhandled fetch'));
  });

  it('gets SOL transfer transaction hashes', async () => {
    mockFetch(simple);
    const result = await findTransactionSignatures(
      'https://solana.rpc',
      'Coxmank2uz3uYs9Z4ZMDDuBY1X9ZmbG1rNHKgA4i1Z5m',
      'Sol',
      [{ amount: 1022887000000n, maxSlot: 313188384 }],
      'mainnet',
    );
    expect(result).toStrictEqual([
      ['4H3Z8wxSJTzX1YqMG9xGRvtzJ4ji1N55dTdiNSA9ZnRVRyXjyxZscbanvFve6ihhxpBzMDFpLjf22cdn2WwpEtiW'],
    ]);
  });

  it('works when the reported max block height is incorrect', async () => {
    mockFetch(maxBlockError);

    const result = await findTransactionSignatures(
      'https://solana.rpc',
      '6CHS241WpfxVC4yGekcjZmN8FrBUDCwZKsKdt85smNub',
      'Sol',
      [{ amount: 1469000000n, maxSlot: 317429934 }],
      'mainnet',
    );
    expect(result).toStrictEqual([
      ['2fY29J3QxaRQFX44ngQuGMQSdBrMPLubWRrHkjELg3X5Y6fVTyBoha18j58MEcBcLENZoctVPJX6v6cFZnTsjdk8'],
    ]);
  });

  it('combines multiple transactions', async () => {
    mockFetch(combineTxs);

    const result = await findTransactionSignatures(
      'https://solana.rpc',
      '2p1mhPq93ob1NnKYR1PH2tKhqMdQTPPJFEtjt6tYWn5p',
      'Sol',
      [
        { amount: 100000000n, maxSlot: 315326189 },
        { amount: 4100010000n, maxSlot: 315261223 },
      ],
      'mainnet',
    );
    expect(result).toStrictEqual([
      [
        '2XqRkbCsNMpVtD1vDPM7enDS3iQ6Nrs5JYsrG9VMaXkXJw2LYbbm3A9TsREm7GCub8FgWXpsZYeK9dY6Aj6N1jy8',
        '5btZpyhXnFKjxneTWFDqchWg7VALamw1xnDM2QUnKCamhJGxiHPjiE7A39LNjbQ7MAADmJETKbtC5htwhUoaNuXG',
      ],
      [
        '3pR4gJe2dBiaP38e83FegpNxE4eKaVmReCEhi4DFpv2tAnKqKTHER3NW8TzQS6JnbzaArCfbMWypc9h162X6ZqGB',
        '3dwQQgUfipMYDLKq5uUqR5dw4vRLvEkr824AkaPaCNYAQM2yfPrCNW2oDqvRQfM9pjw4UwuY2x1L5ppWbBiJWAvC',
      ],
    ]);
  });

  it('throws if it cannot align the deposits and transfers', async () => {
    mockFetch(combineTxs);

    const result = await findTransactionSignatures(
      'https://solana.rpc',
      '2p1mhPq93ob1NnKYR1PH2tKhqMdQTPPJFEtjt6tYWn5p',
      'Sol',
      [
        { amount: 90000000n, maxSlot: 315326189 },
        { amount: 4100010000n, maxSlot: 315261223 },
      ],
      'mainnet',
    ).catch((e) => e);

    expect(result).toMatchInlineSnapshot(
      `[TransactionMatchingError: failed to align deposits and transfers]`,
    );
    expect(result).toBeInstanceOf(TransactionMatchingError);
    expect((result as TransactionMatchingError).deposits).toMatchInlineSnapshot(`
      [
        {
          "amount": 90000000n,
          "maxSlot": 315326189,
        },
        {
          "amount": 4100010000n,
          "maxSlot": 315261223,
        },
      ]
    `);
    expect((result as TransactionMatchingError).transfers).toMatchInlineSnapshot(`
      [
        {
          "amount": 90000000n,
          "signature": "2XqRkbCsNMpVtD1vDPM7enDS3iQ6Nrs5JYsrG9VMaXkXJw2LYbbm3A9TsREm7GCub8FgWXpsZYeK9dY6Aj6N1jy8",
          "slot": 315262424,
        },
        {
          "amount": 10000000n,
          "signature": "5btZpyhXnFKjxneTWFDqchWg7VALamw1xnDM2QUnKCamhJGxiHPjiE7A39LNjbQ7MAADmJETKbtC5htwhUoaNuXG",
          "slot": 315260820,
        },
        {
          "amount": 10000n,
          "signature": "3pR4gJe2dBiaP38e83FegpNxE4eKaVmReCEhi4DFpv2tAnKqKTHER3NW8TzQS6JnbzaArCfbMWypc9h162X6ZqGB",
          "slot": 315260540,
        },
        {
          "amount": 4100000000n,
          "signature": "3dwQQgUfipMYDLKq5uUqR5dw4vRLvEkr824AkaPaCNYAQM2yfPrCNW2oDqvRQfM9pjw4UwuY2x1L5ppWbBiJWAvC",
          "slot": 315260432,
        },
      ]
    `);
  });

  it('handles this cluster', async () => {
    mockFetch(cluster);

    const result = await findTransactionSignatures(
      'https://solana.rpc',
      '7YZMrkLo41uhmdVftMBBfH9Zo1rVFTuBVmstmNPUDHL7',
      'Sol',
      [
        { amount: 10000000n, maxSlot: 308738807 },
        { amount: 10000000n, maxSlot: 308738659 },
        { amount: 10000000n, maxSlot: 308738630 },
        { amount: 10000000n, maxSlot: 308738498 },
        { amount: 10000000n, maxSlot: 308738396 },
        { amount: 10000000n, maxSlot: 308737650 },
        { amount: 20000000n, maxSlot: 308737616 },
        { amount: 10000000n, maxSlot: 308737114 },
        { amount: 10000000n, maxSlot: 308736318 },
      ],
      'mainnet',
    );
    expect(result).toStrictEqual([
      ['62gvhpPe1kPv3QdYM99nEXP3LrZjY2QeLxfEFD9Ac4H2TrvSZwy8etiTQhGDQiYovGugAEu5t6PCje47hvTieP5t'],
      ['23ubVJk2tKnVi6nssZZ3tiydbd8wXwxo8TuCFQ6FAMHn9gK3YyRgYAA2dJWdnhHdn8Mif6ocGPkqLnWRk9AagrXM'],
      ['4sVaGvjjksjh7RKVpLHfCVYS8cnj8uQ7c6ChaqDwYR3Haiymymgcq5s8fKXnJiKCZMaMJNbpq765PQvhry69Nv67'],
      ['5YHuoGJkh9979CeJ3rH4d73dXwXQakMytBcNDswtebUJHQrgjixo9c4kK8PtSmhTfzUbZiv47JwgXGYRQEVADhy2'],
      ['4MhTRmd5vCkggbb6tsjFQXGaNGat9Ny4UnmsUNhBbdx4LD6kH34GNnhG7BDAAJZTM8tJWNqiZKNgLNGMEpUDmzw6'],
      ['2adxMnYd3wPD5P6tVhXW18JjnYu8KJkCTaiKzfZo31foXdnBPLkvS3h5JXVm6Dii4GGnonWcWUv2YQ8B5cA3mwh2'],
      [
        'BXfjjLmSSYDwdaEBLrewxAWUZwZXSrE538wLNrSFBkG8WmZRCK2G5toCrwPvh34eNZ6PAtqZV8yKvdAFUZqpG99',
        '3UkLw9ERqbHuHKvoQdpgAJ2YP3bVmQUx51PWpvMXx93njvgoCEtbky98AYyurJny3DWXtbNcWo169shUvj8wLEio',
      ],
      ['5dh8JaXtsRiXvkdMztA3RRv3YYSBdU39TDV85yUBBe66zCkXNqYTEUnyxdNbCwXdnsswykHnyaCAwJNTACYSVWZg'],
      ['RzemfL8UFxBpjGUj4zB7YJVG4kBQhVFvAv8GQ2fbtMoDiLCUMG1XfG9sDc1cL1rePMRDEmwiBckX7FhqhTC3U9f'],
    ]);
  });

  it('handles multiple transfers per transaction', async () => {
    mockFetch(doubleTransfer);

    const result = await findTransactionSignatures(
      'https://solana.rpc',
      'EMWEFHBoso53CavbLh3gBVAxz6Chxyq4HTwzPqH9XbLx',
      'Sol',
      [
        { amount: 10000n, maxSlot: Infinity },
        { amount: 2n, maxSlot: Infinity },
        { amount: 10000n, maxSlot: Infinity },
        { amount: 150000010000n, maxSlot: 306370166 },
      ],
      'mainnet',
    );
    expect(result).toStrictEqual([
      ['31VHwvUbZ9oCiMcjZbRFY8qTUnwXzaHSkhxzbVSy5ad5jGR79bVZwPN72Ur5RaMXLTXsa5shzV3PqJuKiRaAqD1d'],
      ['wzcMZbh3vYgd4AgXdgYiyi3ZZMcrYWrUkBWrXWmf5fRRVnugtUFxnwNzfR4vyK1SwpDxvkabHuRiMUqKmiPfAkF'],
      ['4iNFQ5e1VrTu7j8KrVkyUa5YWvpXhFdLenFNTMAbgigCXRB4Gf864uKfecDeWmr8iKxqUPew8phLdX6fcZAhSjjT'],
      [
        '5RuqxREUP4MDiHoMz4irqXJrD5Bvw88PAZTBVjkiXM4aASEug9mHaknzypJ9udfPVFGWNyLrPe1vJfT2Ficn7Jjz',
        '2Rq6fKYAG3fe9JtQvMprzGSX7KZakaQ8A7oGddJsB3usJbLvyAMiuyWar4utzQzSuhiYmtbG1yhhT1p3d52pYqNc',
      ],
    ]);
  });

  it('paginates', async () => {
    mockFetch(paginate1);
    mockFetch(paginate2);
    mockFetch(paginate3);

    const result = await findTransactionSignatures(
      'https://solana.rpc',
      'A8dScaeGChTgzvok95uVAxd44LRkq5ckcpppNVQwkLQb',
      'Sol',
      [
        { amount: 500000000n, maxSlot: 308743484 },
        { amount: 500000000n, maxSlot: 308743272 },
        { amount: 500000000n, maxSlot: 308743163 },
        { amount: 400000000n, maxSlot: 308743080 },
        { amount: 400000000n, maxSlot: 308743052 },
        { amount: 400000000n, maxSlot: 308742894 },
        { amount: 400000000n, maxSlot: 308742850 },
        { amount: 400000000n, maxSlot: 308742812 },
        { amount: 400001000n, maxSlot: 308742586 },
        { amount: 400000000n, maxSlot: 308742470 },
        { amount: 400000000n, maxSlot: 308742382 },
        { amount: 300000000n, maxSlot: 308742319 },
        { amount: 1000n, maxSlot: Infinity },
        { amount: 300000000n, maxSlot: 308742254 },
        { amount: 300001000n, maxSlot: 308742128 },
        { amount: 300000000n, maxSlot: 308741973 },
        { amount: 300001000n, maxSlot: 308741765 },
        { amount: 1000n, maxSlot: Infinity },
        { amount: 300000000n, maxSlot: 308741467 },
        { amount: 300000000n, maxSlot: 308741370 },
        { amount: 300000000n, maxSlot: 308740636 },
        { amount: 300000000n, maxSlot: 308740295 },
        { amount: 200000000n, maxSlot: 308739405 },
        { amount: 10000000n, maxSlot: 308739222 },
      ],
      'mainnet',
    );
    expect(result).toStrictEqual([
      ['yq1e2R8NV8vJSDFk2FFJXzQm3Ttz4FDHLMUYJspzknTXZvYfWQHbMGpP6DN2xANJ2Fjkvk3Y117urVoukKAvuq8'],
      ['3WpSRuomMw4gx1eSnzUUDjgGif82MKevh9mwHCPriLx1tSM5mCgYzpAi1fDtzSPd2TDaPZtq953VS9S2XvRMnQQL'],
      ['24YMwWwNGvhtQwTqcjCsxw4NSqSs1f6yQSLupXdPjVzwaEmHWikn9AvH8QCoEWnSUWBYo3wrf5dfHNbAtcPNC8gk'],
      ['5shWdAqZjem5295Tmb6cNP55xvrZuEVd85jiEpS75pDrTWy74jtji336f39XBtiwF8Kn4LuLYS7ffZa7wz6v1eAY'],
      ['5oaHkw6abWycj2HDHZXjEHjaXwnhDkgKBTeAg2WkWj8cQbAqdHaPankxDJadJMQrDAwkvQeG9oDqDQSM5rG3fYut'],
      ['nr8oYqh5p6GoKGCcPzsxzxsinS47TfckvS2wBY9hzCP3SLNtW4gL76GVqGA5CdCv3PyCGguc2h77rpYWp4rTpYZ'],
      ['BYc38WaQDr2ucrCx3qwk8ABC8KVBXZtkiaLJKjxFDv2UT5Jswy1ES2UygS12DUdwm4RcSzaSVfXug27v1UArTfm'],
      ['255wJ1w7pN63GkDbEhDTC23mffh39PGwgUQqRmmLsfRTHZYLxSJBpVDwXMDSwXwgVbf7c51EwZX2ujqgo5KPQYiq'],
      [
        'tuPCBYd37iFbrTDnJVow23uqTqXWL2VgQgQYBJcVn9XiTxwoYWP1FGAq2szq3XNZiGy4FxzZDf1uSoJWL2Y1vSX',
        '4eRBwJKMWrJrr1Crzqm1noFZ45fZf11oEMMiW2eyE9RVtR3WGzysmZTQBvGRidUQRVtRTsdBhbW5b2ycgHkFXPJh',
      ],
      ['5NxVQKyqfoHXMDicnkbAUBaQgWXC9DhsiwRA2n3p7idiT7BqpynjK99onQ5amLGT8LcDasfrgvLThksDhBUr3B9F'],
      ['4KsWx2hemxXxuBkP1QuR4jJSxxQachW4v5mYxdp98ovqoU47Vm9hcBuwoRmxDU9CEAdDTqBjAbTeQW7HtudJcrMM'],
      ['5f8r3h5nfRcjyXSUJ3NsJs4fP5kpbxGfTsLhsCXDWu3tgfSkPCJyzPMggrpbypizeHiJD5zvVcnG6XdpwW1QLs6x'],
      ['3irBLpVez3MaqVbMuA6cZvBB1GPqJJEaSYS1MjUje7Sego61ppftrAmWyRwNqQdZeZeCEjZdLfm64Ho2cncKDwu6'],
      ['v6VoD3ZEn181FeykGFXHs1GxBMhcGhcgLR15kfVN1gbfu31CQ8kMmK3ZuP2ji4mjaUQf5Ab8A9ZUcVNsSkuw7V6'],
      [
        'gLkDvYcE7im7QTww83RDuAF7C3mQd6cHpxVsx1GUiG9JFCK5Ub7nqC1BERzZBg3v7fmCuPtXp9NrTt5oNpUyRCX',
        '5pFQ9pueVudZdfg3K52DqbWFFLrRpTEkprPvgr7mMdNk9L4pfKjiV3VnZ8bqbLqd5V6pDJ6yQo4Jwi2Nj8Rzjgp1',
      ],
      ['5bAdpeQTWd7X3JkEiajqEN7H4iMuTVJajRUePZu8RDTAPQsrTgYZjAayd8R8k3y5tpfpCaPCGUvC1rMTvYUfxxUR'],
      [
        '5d8dYi5NCZfbA2p37wUoQ4SWBvQV4RooCHpe7AwpvooQyds5ESqUMB97UX7NqvZVC8xBk2bP712vwaaQnmRbJmt2',
        '5JQ1qyvhK6La5U5YvX33Tb3ToF9YwKPhuD5NzZsiUYDLsd3SvThhxrkQbUGRW44JbrnAy8S5HEnuszdLg3c1SKtk',
      ],
      ['3Nf5t5gKwxAAXmyhN2qapT6tzCeEnbXdryZHpvSnfoG6SQo4xjMEZYzDxxCx8fyADfZofjDgpY9Y8Tfd45P6mGLf'],
      ['4j3P6ifhDs5L66RHqXhS9ddarvDeqsRRsrKf4mJRnWVhoaHTmkmQpdw3cYswXohCtVXfhAY1Nc9QQkgC7BDYQZP6'],
      ['48pAwBcmGz8zAmc17bLbc7Bo89NSQS4STjL8XrbpAYhiS8JP3G5sysR17yqRv6mkNkDU92XbyNzCMebBmJmMa4GJ'],
      ['56H1CvcBi1r4m9io52b58wG5LQKHUJVyEehr8DnM3NJKTz1V8kPKkeNiRqofMvHA4pRs4LoWtKLKNk2LDoZSJFUw'],
      ['2NwHiBerPQfZ2HUySqqjpWrmd6szG2VhAvMd5Wo1XREa7t6kJUqdU22ipsgbGsnYukizp1v1LKfexgNaamihX98A'],
      ['2kPuW2kgutNCxTRJKoKcj4mY6ZYNEssCp6ykoVY6tQharvL1skFKvfuVetczs9K25j1Vg6K557tH6dXi8X4gJF1S'],
      ['8ocSHUBfV91ja7ox8Epu3NVcVefATEhGKHXGfidU9HNmHjo9c1mGhn4hJLm3kPjvzVfv7JWYbcXLLy6WKFB6qKK'],
    ]);
  });

  it('fails when the difference is too great', async () => {
    mockFetch(bigDiff);

    await expect(
      findTransactionSignatures(
        'https://solana.rpc',
        '6CHS241WpfxVC4yGekcjZmN8FrBUDCwZKsKdt85smNub',
        'Sol',
        [{ amount: 1469000000n, maxSlot: 317429934 }],
        'mainnet',
      ),
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `[TransactionMatchingError: transfers are too new]`,
    );
  });

  it('works with SolUsdc transfers from RPC', async () => {
    mockFetch(solusdc);

    const result = await findTransactionSignatures(
      'https://solana.rpc',
      'CBdz82ptVQSHzqSdCDXHEWjJMumrTmJxhyFa3C9LoKc5',
      'SolUsdc',
      [{ amount: 561478103n, maxSlot: 318246054 }],
      'mainnet',
    );
    expect(result).toStrictEqual([
      ['4yLTAfpkufqUsE5Pvd64XoEHcLeRiFbGKLLx6VtZyenN6uEe9fSYJXcogzZtDYi6DACDoqNUQ8f769YXs9FC8Lfz'],
    ]);
  });

  it('works with SolUsdc transfers from RPC (tiny amount)', async () => {
    mockFetch(solusdc2);
    const result = await findTransactionSignatures(
      'https://solana.rpc',
      '63AcCiiy1xb1axsRfmyXm6RbhxqQoNfuJre6BktGz5Pi',
      'SolUsdc',
      [
        { amount: 1n, maxSlot: Infinity },
        { amount: 54246510369n, maxSlot: 305625854 },
      ],
      'mainnet',
    );
    expect(result).toStrictEqual([
      ['4fjPpTxWPouQUDu9bMYqbZc14jKbNXDsXzhvwBygb8Nfoy8evNA5sa11Z1Ue4Ujx6i75d1VNtsYyzj77fbM495vD'],
      ['5kCxRnFfi9zfpRaqJo67VXNeDuTujoKJ2ixPMToERwjEGfrjJ4LH9ciTq6PLrSrfFiLJ1RF3iLC8B6zbxUEAw2it'],
    ]);
  });

  it('works with SolUsdc on devnet', async () => {
    mockFetch(devnet);
    const result = await findTransactionSignatures(
      'https://solana.rpc',
      '8haqznF43DrGmdq78Hz6tTHZExMZeZfe5amVqXjahihG',
      'SolUsdc',
      [{ amount: 222108813n, maxSlot: Infinity }],
      'devnet',
    );
    expect(result).toStrictEqual([
      ['3mYJ5r6ypAD4s6iGJDghKLSd8KukAjhSCW5MoBMZYKmnFvGayKLbxM4FhDavHBdwgLeP8k6PDA8APSVA1Sg4A6cn'],
    ]);
  });

  it('handles out of order txs', async () => {
    mockFetch(unsorted);
    const result = await findTransactionSignatures(
      'https://solana.rpc',
      'D2J9iUNMegbHLXEBeqq4JwUrWxYVEJkBQ5BzBsmSYEjj',
      'Sol',
      [
        { amount: 100000n, maxSlot: Infinity },
        { amount: 427077240n, maxSlot: Infinity },
      ],
      'mainnet',
    );
    expect(result).toStrictEqual([
      ['4stUE2eQCmdnxBMYuTDZfEhqKJfeSCzhJpvtD4xtFRfZ8PYVpDK4R4dd3u4k7GFwb1bLnRLvdBvoVpvbctGTfbEQ'],
      ['2VjrqbZ3LwLN1bDvFW9bLEYmcQAMmB5kCXSeUBHFDc2imAkK9ij9cgPNDPJeqfTVirVvYbLCfAWFnEUUTguwbUB5'],
    ]);
  });
});

describe(findVaultSwapSignature, () => {
  it('it finds the vault swap signature', async () => {
    const spy = spyOn(Connection.prototype, 'getSignaturesForAddress');

    mockFetchWithResponses([
      {
        jsonrpc: '2.0',
        result: [
          {
            blockTime: 1738773949,
            confirmationStatus: 'finalized',
            err: null,
            memo: null,
            signature:
              '4pEt91qznsQu7MNiEqHjMLXyR6ZjXLP8PqbtWvg8DxgEAK62DP6Xm1HSBsEdYDaBTcAhQnph9SMduYybqK3P28bD',
            slot: 3165493,
          },
          {
            blockTime: 1738773877,
            confirmationStatus: 'finalized',
            err: null,
            memo: null,
            signature:
              '4kVrUsvMjoZfetYdfKx3CgkverNC72iDDqMcr3qERHT117sWqhszBsj5CqMDFs1uoy3cNnNVvGfPaercdRg1phy4',
            slot: 3165324,
          },
        ],
        id: '1',
      },
    ]);

    expect(
      await findVaultSwapSignature(
        'https://solana.rpc',
        'FktykLDxTR3MnKSFQM4tGx7FPTaRVtHBzFsx57P8JumL',
        3165324,
      ),
    ).toBe(
      '4kVrUsvMjoZfetYdfKx3CgkverNC72iDDqMcr3qERHT117sWqhszBsj5CqMDFs1uoy3cNnNVvGfPaercdRg1phy4',
    );
    expect(spy.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "FktykLDxTR3MnKSFQM4tGx7FPTaRVtHBzFsx57P8JumL",
          {
            "limit": 10,
            "minContextSlot": 3165324,
          },
        ],
      ]
    `);
  });
});

describe(findVaultSwapData, () => {
  it('gets the vault swap data for token swaps', async () => {
    mockFetchWithResponses([swapTokenDevnet]);

    const data = await findVaultSwapData(
      'https://solana.rpc',
      '3LWDhFzGAxKt65xKe19iUGmCiHBc5FDSUV8fETr4TavMP98YFEtso6pyf7ZEcZRjNC5Qka8bfQNUfzVP3r2C77Mo',
    );

    expect(data).toMatchInlineSnapshot(`
      {
        "affiliateFees": [],
        "amount": 20000000n,
        "brokerFee": {
          "account": "cFMTNSQQVfBo2HqtekvhLPfZY764kuJDVFG1EvnnDGYxc3LRW",
          "commissionBps": 0,
        },
        "ccmDepositMetadata": null,
        "dcaParams": null,
        "depositChainBlockHeight": 365493638,
        "destinationAddress": "0xa56a6be23b6cf39d9448ff6e897c29c41c8fbdff",
        "inputAsset": "SolUsdc",
        "maxBoostFee": 0,
        "outputAsset": "Eth",
        "refundParams": {
          "minPrice": 176416843473861217126367300745109052927311111891n,
          "refundAddress": "3yKDHJgzS2GbZB9qruoadRYtq8597HZifnRju7fHpdRC",
          "retryDuration": 100,
        },
      }
    `);
  });

  it('handles null tx response', async () => {
    mockFetchWithResponses([{ jsonrpc: '2.0', id: '1', result: null }]);

    const data = await findVaultSwapData(
      'https://solana.rpc',
      '3LWDhFzGAxKt65xKe19iUGmCiHBc5FDSUV8fETr4TavMP98YFEtso6pyf7ZEcZRjNC5Qka8bfQNUfzVP3r2C77Mo',
    );

    expect(data).toBeNull();
  });

  it('filters for the desired txs', async () => {
    mockFetchWithResponses([notVaultSwap]);

    const data = await findVaultSwapData(
      'https://solana.rpc',
      '2W194usaXnNPJkxAd8e9t6s1S6EBgQqDxSEmkU6pKtUibErm6FS4BLUa49voJgdz9YEdBeycFt56oFBWUFy7byik',
    );

    expect(data).toBeNull();
  });

  const address1 = '12MYcNumSQCn81yKRfrk5P5ThM5ivkLiZda979hhKJDR';
  const address2 = '2BcYzxGN9CeSNo4dF61533xS3ytgwJxRyFYMoNSoZjUp';
  const ccmAdditionalData: SolanaCcmAdditionalData = {
    additionalAccounts: [{ pubkey: address1, isWritable: true }],
    cfReceiver: { pubkey: address2, isWritable: false },
    fallbackAddress: address2,
  };

  const swapData = {
    Eth: {
      destinationAddress: hexToBytes('0xa56a6be23b6cf39d9448ff6e897c29c41c8fbdff'),
      brokerCommission: 30,
      amount: 1e9,
      retryDurationBlocks: 100,
      refundAddress: address1,
      ccmParameters: { message: '0xcafebabe', gasAmount: 420 },
      ccmAdditionalData,
    },
    ArbEth: {
      destinationAddress: hexToBytes('0xa56a6be23b6cf39d9448ff6e897c29c41c8fbdff'),
      dcaParams: { numberOfChunks: 1, chunkIntervalBlocks: 2 },
      brokerCommission: 15,
      amount: 0.1e9,
      retryDurationBlocks: 90,
      refundAddress: address2,
      ccmParameters: { message: '0xcafebabe', gasAmount: 420 },
    },
    Sol: {
      destinationAddress: base58.decode('A8dScaeGChTgzvok95uVAxd44LRkq5ckcpppNVQwkLQb'),
      dcaParams: { numberOfChunks: 20, chunkIntervalBlocks: 100 },
      brokerCommission: 10,
      amount: 0.01e9,
      retryDurationBlocks: 80,
    },
    Dot: {
      destinationAddress: ss58.decode('167ZvRqc7V6HrEUSvtV8c3JRUtPjJhHXUpAwhmPktAGj1uzq').data,
      brokerCommission: 0,
      amount: 0.001e9,
      retryDurationBlocks: 69,
      affiliateFees: [{ account: 1, commissionBps: 10 }],
    },
    Btc: {
      destinationAddress: new TextEncoder().encode('tb1qhjurnfz4qah4rg7ntue6x287ehdvded20rj9vh'),
      dcaParams: { numberOfChunks: 1, chunkIntervalBlocks: 2 },
      brokerCommission: 5,
      amount: 0.0001e9,
      retryDurationBlocks: 50,
      affiliateFees: [{ account: 2, commissionBps: 20 }],
      brokerAccount: 'cFLre1qinRDSoxnQ4sFEXRde58jkmkVMX7B2NFGkgZJ9pQLqF',
    },
  } as const satisfies Partial<
    Record<ChainflipAsset, Omit<Parameters<typeof swapNative>[0], 'destinationAsset'>>
  >;

  it.each(Object.keys(swapData) as (keyof typeof swapData)[])(
    'handles swap native for %s on devnet',
    async (asset) => {
      mockFetchWithResponses([
        swapNative({
          ...swapData[asset],
          destinationAsset: asset,
        } as Parameters<typeof swapNative>[0]),
      ]);

      const data = await findVaultSwapData(
        'https://solana.rpc',
        '2W194usaXnNPJkxAd8e9t6s1S6EBgQqDxSEmkU6pKtUibErm6FS4BLUa49voJgdz9YEdBeycFt56oFBWUFy7byik',
      );

      expect(data).toMatchSnapshot();
    },
  );

  it.each(Object.keys(swapData) as (keyof typeof swapData)[])(
    'handles swap native for %s on mainnet',
    async (asset) => {
      const tx = swapNative({
        ...swapData[asset],
        destinationAsset: asset,
      } as Parameters<typeof swapNative>[0]);

      tx.result.transaction.message.instructions[0].programId = mainnet.address;

      mockFetchWithResponses([tx]);

      const data = await findVaultSwapData(
        'https://solana.rpc',
        '2W194usaXnNPJkxAd8e9t6s1S6EBgQqDxSEmkU6pKtUibErm6FS4BLUa49voJgdz9YEdBeycFt56oFBWUFy7byik',
      );

      expect(data).toMatchSnapshot();
    },
  );
});
