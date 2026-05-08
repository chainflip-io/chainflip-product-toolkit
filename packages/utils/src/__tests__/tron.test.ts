import { describe, expect, it, vi } from 'vitest';
import * as base58 from '../base58';
import { isValidTronAddress } from '../tron';

describe('tron', () => {
  it.each([
    ['', false],
    ['123', false],
    ['123', false],
    ['fakeaddress', false],
    // block hash
    ['1d5f4a8582092754831efe6651ee7569e39068c8d8cba034982a9f3bec15f488', false],
    ['8bcdf74918eb1f60b8c670754b8303f68d8c266a5edb4cf62c77e080b404a0a5', false],
    // signature hash
    ['1d5f4a8582092754831efe6651ee7569e39068c8d8cba034982a9f3bec15f488', false],
    //usdt contract address
    ['TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t', true],
    // accounts on the curve
    ['TNPeeaaFB7K9cmo4uQpcU32zGK8G1NYqeL', true],
    ['TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t', true],
    ['TJvtYxkeHxB8VuNncpQN6UtfWM5XaUQ3Y4', true],
    // invalid address
    ['TNPeeaaFB7K9cmo4uQpcU32zGK8G1NY', false],
    ['418840E6C55B9ADA326D211D818C34A994AECED808', false],
  ])(`isValidTronAddress(%s) should return %s`, (address, expected) => {
    expect(isValidTronAddress(address), address).toBe(expected);
  });

  it('returns false when base58.decode throws', () => {
    vi.spyOn(base58, 'decode').mockImplementationOnce(() => {
      throw new Error('decode error');
    });
    expect(isValidTronAddress('TNPeeaaFB7K9cmo4uQpcU32zGK8G1NYqeL')).toBe(false);
  });
});
