import {
  type ConfirmedSignatureInfo,
  Connection,
  MessageV0,
  PublicKey,
  type VersionedTransactionResponse,
} from '@solana/web3.js';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { findSolanaDepositSignature } from '../deposit';

vi.mock('@solana/web3.js', async (importOriginal) => {
  const actual = await importOriginal();

  const ConnectionMock = vi.fn();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  ConnectionMock.prototype.getSignaturesForAddress = vi.fn();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  ConnectionMock.prototype.getTransactions = vi.fn();

  // @ts-expect-error typescript cannot infer the type of actual
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return { ...actual, Connection: ConnectionMock };
});

const transactions: Record<string, VersionedTransactionResponse> = {
  '3zC67SpVaUAMXitSZw6Z1HtTPFtEEeKdJ2cAkHGAPYyBdWkbbT3RRva9Do6SbQjk8Zs8oHJrprV8txdc3YgBp33x': {
    blockTime: 1733324203,
    meta: {
      computeUnitsConsumed: 450,
      err: null,
      fee: 45000,
      innerInstructions: null,
      loadedAddresses: {
        readonly: [],
        writable: [],
      },
      logMessages: null,
      postBalances: [13136009466, 6000000000, 1, 1],
      postTokenBalances: [],
      preBalances: [19136054466, 0, 1, 1],
      preTokenBalances: [],
    },
    slot: 305374576,
    transaction: {
      message: new MessageV0({
        header: {
          numReadonlySignedAccounts: 0,
          numReadonlyUnsignedAccounts: 2,
          numRequiredSignatures: 1,
        },
        staticAccountKeys: [
          new PublicKey('HGDmbWtWotT3YH4SMinHsJ1QjziYtpHPHxBiy63tGFpn'),
          new PublicKey('8z1bM4fWJwvz6shKBvdfFBtW1mNAvhZ6dw8TJo7ZxP4R'),
          new PublicKey('11111111111111111111111111111111'),
          new PublicKey('ComputeBudget111111111111111111111111111111'),
        ],
        recentBlockhash: 'HPn7zUWcbtNDGMUJoH9t6m7c33LA6MPmnRWCiZErHhLG',
        compiledInstructions: [
          {
            accountKeyIndexes: [],
            data: Uint8Array.from('3QAwFKa3MJAs'),
            programIdIndex: 3,
          },
          {
            accountKeyIndexes: [],
            data: Uint8Array.from('Fj2Eoy'),
            programIdIndex: 3,
          },
          {
            accountKeyIndexes: [0, 1],
            data: Uint8Array.from('3Bxs3zyoqgkX7Cqd'),
            programIdIndex: 2,
          },
        ],
        addressTableLookups: [],
      }),
      signatures: [
        '3zC67SpVaUAMXitSZw6Z1HtTPFtEEeKdJ2cAkHGAPYyBdWkbbT3RRva9Do6SbQjk8Zs8oHJrprV8txdc3YgBp33x',
      ],
    },
    version: 'legacy',
  },
  '': {
    blockTime: 1733324356,
    meta: {
      computeUnitsConsumed: 300,
      err: null,
      fee: 10000,
      innerInstructions: null,
      loadedAddresses: {
        readonly: [],
        writable: [],
      },
      logMessages: null,
      postBalances: [3675268583, 0, 6000001000, 1],
      postTokenBalances: [],
      preBalances: [3675279583, 0, 6000000000, 1],
      preTokenBalances: [],
    },
    slot: 305374928,
    transaction: {
      message: new MessageV0({
        header: {
          numReadonlySignedAccounts: 0,
          numReadonlyUnsignedAccounts: 1,
          numRequiredSignatures: 2,
        },
        staticAccountKeys: [
          new PublicKey('7N6ZMcfhSxsgfNgYFN6TvVNXXTPsjGkiTL1Hjeu87123'),
          new PublicKey('HjTk9xBQdywVrX12qozPtRyc2sKAWXjK51Jsv7kkGFpn'),
          new PublicKey('8z1bM4fWJwvz6shKBvdfFBtW1mNAvhZ6dw8TJo7ZxP4R'),
          new PublicKey('11111111111111111111111111111111'),
        ],
        recentBlockhash: '2XabT5WpyP5MCqAt6fVqYji3guCHMV9xw8JqMFguyJLC',
        compiledInstructions: [
          {
            accountKeyIndexes: [0, 1],
            data: Uint8Array.from('3Bxs4ffTu9T19DNF'),
            programIdIndex: 3,
          },
          {
            accountKeyIndexes: [1, 2],
            data: Uint8Array.from('3Bxs4ffTu9T19DNF'),
            programIdIndex: 3,
          },
        ],
        addressTableLookups: [],
      }),
      signatures: [
        '546q8d7bhBaNBLL8jj3mPHeN3DGD3n1Y2qyhAVeuwsuPRNj8UVFerB3DRzh4sDS3ftaKBtoSiJsXMgx6aHTNhwEr',
        '4jV5xFtVRV89CL4dztJX6iMXzE5E5bziSM8rEpMroidiiLNt16PJMF3zSNb8B2UPL226GzdbFsNPcngFemHEtZAz',
      ],
    },
    version: 'legacy',
  },
  YvQLEdk8ZP4MQeDk657bXyyj7xtEGtUcPMrdAM5546F9QAaS87WGniitisbUy1E68aiKXvPFXvw3zPdJk1UcWjE: {
    blockTime: 1733301977,
    meta: {
      computeUnitsConsumed: 25639,
      err: null,
      fee: 25000,
      innerInstructions: null,
      loadedAddresses: {
        readonly: [],
        writable: [],
      },
      logMessages: null,
      postBalances: [
        1571749976, 2039280, 2039280, 1, 731913600, 0, 321908068466, 1, 934087680, 1009200,
      ],
      postTokenBalances: [
        {
          accountIndex: 1,
          mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
          owner: 'EqkWgheG46WRqAR5Tsi3x7PvgHcW1gq8gPaN7JLtXri4',
          programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
          uiTokenAmount: {
            amount: '100000000',
            decimals: 6,
            uiAmount: 100,
            uiAmountString: '100',
          },
        },
        {
          accountIndex: 2,
          mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
          owner: '67ta16PhyLVxcDNM9XpJMbpougPCPm1tQvZvkT75GfiP',
          programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
          uiTokenAmount: {
            amount: '80805910',
            decimals: 6,
            uiAmount: 80.80591,
            uiAmountString: '80.80591',
          },
        },
      ],
      preBalances: [1573814256, 0, 2039280, 1, 731913600, 0, 321908068466, 1, 934087680, 1009200],
      preTokenBalances: [
        {
          accountIndex: 2,
          mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
          owner: '67ta16PhyLVxcDNM9XpJMbpougPCPm1tQvZvkT75GfiP',
          programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
          uiTokenAmount: {
            amount: '180805910',
            decimals: 6,
            uiAmount: 180.80591,
            uiAmountString: '180.80591',
          },
        },
      ],
    },
    slot: 305320588,
    transaction: {
      message: new MessageV0({
        header: {
          numReadonlySignedAccounts: 0,
          numReadonlyUnsignedAccounts: 7,
          numRequiredSignatures: 1,
        },
        staticAccountKeys: [
          new PublicKey('67ta16PhyLVxcDNM9XpJMbpougPCPm1tQvZvkT75GfiP'),
          new PublicKey('7PuSGgyanuGbrEcsDrb6awuSNbmJqsxuPexjQ6PQPmDR'),
          new PublicKey('EeBCFzEPXootrQnrKfDQsZbK7f1WqbqQVvE5UWL3C97T'),
          new PublicKey('ComputeBudget111111111111111111111111111111'),
          new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'),
          new PublicKey('EqkWgheG46WRqAR5Tsi3x7PvgHcW1gq8gPaN7JLtXri4'),
          new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
          new PublicKey('11111111111111111111111111111111'),
          new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
          new PublicKey('SysvarRent111111111111111111111111111111111'),
        ],
        recentBlockhash: 'Bu6e6utVPYsR5Z6sZJjcKxVKseaaQhYfLDYLAV3YWj8y',
        compiledInstructions: [
          {
            programIdIndex: 3,
            accountKeyIndexes: [],
            data: Uint8Array.from([3, 160, 134, 1, 0, 0, 0, 0, 0]),
          },
          {
            programIdIndex: 3,
            accountKeyIndexes: [],
            data: Uint8Array.from([2, 64, 13, 3, 0]),
          },
          {
            programIdIndex: 4,
            accountKeyIndexes: [0, 1, 5, 6, 7, 8, 9],
            data: Uint8Array.from([]),
          },
          {
            programIdIndex: 8,
            accountKeyIndexes: [2, 1, 0],
            data: Uint8Array.from([3, 0, 225, 245, 5, 0, 0, 0, 0]),
          },
        ],
        addressTableLookups: [],
      }),
      signatures: [
        'YvQLEdk8ZP4MQeDk657bXyyj7xtEGtUcPMrdAM5546F9QAaS87WGniitisbUy1E68aiKXvPFXvw3zPdJk1UcWjE',
      ],
    },
    version: 0,
  },
};

const solDepositSignatures: ConfirmedSignatureInfo[] = [
  {
    blockTime: 1733324375,
    confirmationStatus: 'finalized',
    err: null,
    memo: null,
    signature:
      '2hibMzUfqY18nB68Di1sy6zo55PuWgtVxNLaTck3WJP7VUyCKPdNExGaa6oCD5tafcYe1kuhaLdWLWSug92Bc3aM',
    slot: 305374972,
  },
  {
    blockTime: 1733324356,
    confirmationStatus: 'finalized',
    err: null,
    memo: null,
    signature:
      '546q8d7bhBaNBLL8jj3mPHeN3DGD3n1Y2qyhAVeuwsuPRNj8UVFerB3DRzh4sDS3ftaKBtoSiJsXMgx6aHTNhwEr',
    slot: 305374928,
  },
  {
    blockTime: 1733324203,
    confirmationStatus: 'finalized',
    err: null,
    memo: null,
    signature:
      '3zC67SpVaUAMXitSZw6Z1HtTPFtEEeKdJ2cAkHGAPYyBdWkbbT3RRva9Do6SbQjk8Zs8oHJrprV8txdc3YgBp33x',
    slot: 305374576,
  },
];

const usdcDepositSignatures: ConfirmedSignatureInfo[] = [
  {
    blockTime: 1733302161,
    confirmationStatus: 'finalized',
    err: null,
    memo: null,
    signature:
      '4TgKWMLrWAiw8muqjaABqqRgNWKjaW2f3iyMXixGTqfguU6o3QirMyJcoBKsPsi4myXpLcMTcqH3BEHbBxAK5sSs',
    slot: 305321032,
  },
  {
    blockTime: 1733301977,
    confirmationStatus: 'finalized',
    err: null,
    memo: null,
    signature:
      'YvQLEdk8ZP4MQeDk657bXyyj7xtEGtUcPMrdAM5546F9QAaS87WGniitisbUy1E68aiKXvPFXvw3zPdJk1UcWjE',
    slot: 305320588,
  },
];

describe('deposit', () => {
  beforeEach(() => {
    vi.mocked(Connection.prototype.getTransactions).mockImplementation((signatures) =>
      Promise.resolve(signatures.map((sig) => transactions[sig])),
    );
  });

  it('finds sol deposit in sol signatures', async () => {
    vi.mocked(Connection.prototype.getSignaturesForAddress).mockResolvedValue(solDepositSignatures);

    // https://scan.chainflip.io/events/5561277-2061
    const result = await findSolanaDepositSignature(
      'https://test.solana.com',
      null,
      '8z1bM4fWJwvz6shKBvdfFBtW1mNAvhZ6dw8TJo7ZxP4R',
      6000000000n,
      0,
      305374642,
    );

    expect(result).toEqual(
      '3zC67SpVaUAMXitSZw6Z1HtTPFtEEeKdJ2cAkHGAPYyBdWkbbT3RRva9Do6SbQjk8Zs8oHJrprV8txdc3YgBp33x',
    );
    expect(Connection.prototype.getTransactions).toHaveBeenCalledWith(
      ['3zC67SpVaUAMXitSZw6Z1HtTPFtEEeKdJ2cAkHGAPYyBdWkbbT3RRva9Do6SbQjk8Zs8oHJrprV8txdc3YgBp33x'],
      { maxSupportedTransactionVersion: 0 },
    );
  });

  it('finds sol deposit in sol signatures with exact slot', async () => {
    vi.mocked(Connection.prototype.getSignaturesForAddress).mockResolvedValue(solDepositSignatures);

    // https://scan.chainflip.io/events/5561277-2061
    const result = await findSolanaDepositSignature(
      'https://test.solana.com',
      null,
      '8z1bM4fWJwvz6shKBvdfFBtW1mNAvhZ6dw8TJo7ZxP4R',
      6000000000n,
      305374576,
      305374576,
    );

    expect(result).toEqual(
      '3zC67SpVaUAMXitSZw6Z1HtTPFtEEeKdJ2cAkHGAPYyBdWkbbT3RRva9Do6SbQjk8Zs8oHJrprV8txdc3YgBp33x',
    );
    expect(Connection.prototype.getTransactions).toHaveBeenCalledWith(
      ['3zC67SpVaUAMXitSZw6Z1HtTPFtEEeKdJ2cAkHGAPYyBdWkbbT3RRva9Do6SbQjk8Zs8oHJrprV8txdc3YgBp33x'],
      { maxSupportedTransactionVersion: 0 },
    );
  });

  it('finds sol deposit in sol signatures with spam tx', async () => {
    vi.mocked(Connection.prototype.getSignaturesForAddress).mockResolvedValue(solDepositSignatures);

    // https://scan.chainflip.io/events/5561277-2061
    const result = await findSolanaDepositSignature(
      'https://test.solana.com',
      null,
      '8z1bM4fWJwvz6shKBvdfFBtW1mNAvhZ6dw8TJo7ZxP4R',
      6000001000n,
      0,
      305374958,
    );

    expect(result).toEqual(
      '3zC67SpVaUAMXitSZw6Z1HtTPFtEEeKdJ2cAkHGAPYyBdWkbbT3RRva9Do6SbQjk8Zs8oHJrprV8txdc3YgBp33x',
    );
    expect(Connection.prototype.getTransactions).toHaveBeenCalledWith(
      [
        '546q8d7bhBaNBLL8jj3mPHeN3DGD3n1Y2qyhAVeuwsuPRNj8UVFerB3DRzh4sDS3ftaKBtoSiJsXMgx6aHTNhwEr',
        '3zC67SpVaUAMXitSZw6Z1HtTPFtEEeKdJ2cAkHGAPYyBdWkbbT3RRva9Do6SbQjk8Zs8oHJrprV8txdc3YgBp33x',
      ],
      { maxSupportedTransactionVersion: 0 },
    );
  });

  it('does not find usdc deposit in sol signatures', async () => {
    vi.mocked(Connection.prototype.getSignaturesForAddress).mockResolvedValue(solDepositSignatures);

    const result = await findSolanaDepositSignature(
      'https://test.solana.com',
      'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
      '8z1bM4fWJwvz6shKBvdfFBtW1mNAvhZ6dw8TJo7ZxP4R',
      6000000000n,
      0,
      305374642,
    );

    expect(result).toEqual(undefined);
    expect(Connection.prototype.getTransactions).toHaveBeenCalledWith(
      ['3zC67SpVaUAMXitSZw6Z1HtTPFtEEeKdJ2cAkHGAPYyBdWkbbT3RRva9Do6SbQjk8Zs8oHJrprV8txdc3YgBp33x'],
      { maxSupportedTransactionVersion: 0 },
    );
  });

  it('finds usdc deposit in usdc signatures', async () => {
    vi.mocked(Connection.prototype.getSignaturesForAddress).mockResolvedValue(
      usdcDepositSignatures,
    );

    // https://scan.chainflip.io/events/5557575-2017
    const result = await findSolanaDepositSignature(
      'https://test.solana.com',
      'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
      'EqkWgheG46WRqAR5Tsi3x7PvgHcW1gq8gPaN7JLtXri4',
      100000000n,
      0,
      305320684,
    );

    expect(result).toEqual(
      'YvQLEdk8ZP4MQeDk657bXyyj7xtEGtUcPMrdAM5546F9QAaS87WGniitisbUy1E68aiKXvPFXvw3zPdJk1UcWjE',
    );
    expect(Connection.prototype.getTransactions).toHaveBeenCalledWith(
      ['YvQLEdk8ZP4MQeDk657bXyyj7xtEGtUcPMrdAM5546F9QAaS87WGniitisbUy1E68aiKXvPFXvw3zPdJk1UcWjE'],
      { maxSupportedTransactionVersion: 0 },
    );
  });
});
