import { ParsedTransactionWithMeta } from '@solana/web3.js';
import { describe, expect, it } from 'vitest';
import { addresses } from '../consts';
import { determineInputAsset } from '../tx';

describe(determineInputAsset, () => {
  it('determines the correct input asset (Sol)', () => {
    expect(
      determineInputAsset({
        meta: { preTokenBalances: [] },
      } as unknown as ParsedTransactionWithMeta),
    ).toBe('Sol');
  });

  it('determines the correct input asset (SolUsdc)', () => {
    expect(
      determineInputAsset({
        meta: { preTokenBalances: [{ mint: addresses.mainnet.SolUsdc }] },
      } as unknown as ParsedTransactionWithMeta),
    ).toBe('SolUsdc');
  });

  it('determines the correct input asset (SolUsdt)', () => {
    expect(
      determineInputAsset({
        meta: { preTokenBalances: [{ mint: addresses.mainnet.SolUsdt }] },
      } as unknown as ParsedTransactionWithMeta),
    ).toBe('SolUsdt');
  });

  it('throws if the input asset cannot be determined', () => {
    expect(() =>
      determineInputAsset({
        meta: { preTokenBalances: [{ mint: 'unknown' }] },
      } as unknown as ParsedTransactionWithMeta),
    ).toThrow('failed to determine input asset');
  });
});
