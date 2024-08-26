import { describe, expect, it } from 'vitest';
import { isValidSolanaAddress } from '../address';

describe('address', () => {
  it.each([
    ['', false],
    ['123', false],
    ['Program Name', false],
    ['fakeaddress', false],
    // block hash
    ['38JiGVG26UdYHVFkScWRoBvRTCcEuZ2JWwCjfTa6NKak', false],
    ['J65zrLRq2YvGp8d9TzddkpvYRbCiNeRUJDksbWmRQeBt', false],
    // signature hash
    [
      '5MoD2UuXe422c95yCPAKTH3ZzDHKv6skkQabyu6fF42iVzs19c5uq4RQEHchX84ApfzxNFPpnxkuLpkFBF8XwgFq',
      false,
    ],
    // accounts on the curve
    ['7EcDhSYGxXyscszYEp35KHN8vvw3svAuLKTzXwCFLtV', true],
    ['EKmyouinRmwRXKoDP7exhevXyeo4ti1gYeC6fx2bcXBX', true],
    ['FdyFSZWuQ5tMHopFQV1D5jTYFSgLxV8m3D1QSNoU3vCZ', true],
    // Wrapped SOL token address
    ['So11111111111111111111111111111111111111112', true],
  ])(`isValidSolanaAddress(%s) should return %s`, (address, expected) => {
    expect(isValidSolanaAddress(address)).toBe(expected);
  });
});
