import { describe, expect, it } from 'vitest';
import { cfBoostPoolDetails, cfBoostPoolPendingFees, numberOrHex } from '../parsers';

describe('parsers', () => {
  describe('numberOrHex', () => {
    it.each([1, '0x1'])('transforms %s into a bigint', (value) => {
      expect(numberOrHex.parse(value)).toBe(BigInt(value));
    });
  });

  describe('cfBoostPoolDetails', () => {
    it('parses boost pool details', () => {
      cfBoostPoolDetails.parse([
        {
          fee_tier: 5,
          chain: 'Bitcoin',
          asset: 'BTC',
          available_amounts: [
            {
              account_id: 'cFL8fmgKZcchhtLagBH2GKfsuWxBqUaD5CYE1m7DFb8DBSLJ1',
              amount: '0xbed6146',
            },
          ],
          deposits_pending_finalization: [
            {
              deposit_id: 11,
              owed_amounts: [
                {
                  account_id: 'cFL8fmgKZcchhtLagBH2GKfsuWxBqUaD5CYE1m7DFb8DBSLJ1',
                  amount: '0xf4240',
                },
              ],
            },
          ],
          pending_withdrawals: [],
        },
        {
          fee_tier: 10,
          chain: 'Bitcoin',
          asset: 'BTC',
          available_amounts: [],
          deposits_pending_finalization: [],
          pending_withdrawals: [],
        },
      ]);
    });
  });

  describe('cfBoostPoolPendingFees', () => {
    it('parses boost pool pending fees', () => {
      cfBoostPoolPendingFees.parse([
        {
          fee_tier: 5,
          chain: 'Bitcoin',
          asset: 'BTC',
          pending_fees: [
            {
              deposit_id: 3,
              fees: [
                {
                  account_id: 'cFL8fmgKZcchhtLagBH2GKfsuWxBqUaD5CYE1m7DFb8DBSLJ1',
                  amount: '0x1f4',
                },
              ],
            },
            {
              deposit_id: 11,
              fees: [
                {
                  account_id: 'cFL8fmgKZcchhtLagBH2GKfsuWxBqUaD5CYE1m7DFb8DBSLJ1',
                  amount: '0x1f4',
                },
              ],
            },
          ],
        },
        {
          fee_tier: 10,
          chain: 'Bitcoin',
          asset: 'BTC',
          pending_fees: [],
        },
        {
          fee_tier: 30,
          chain: 'Bitcoin',
          asset: 'BTC',
          pending_fees: [],
        },
      ]);
    });
  });
});
