import { describe, expect, it } from 'vitest';
import { isBlockSpecLessThanVersion } from '../chainflip';

describe(isBlockSpecLessThanVersion, () => {
  it('correctly compares spec versions', () => {
    expect(isBlockSpecLessThanVersion('2.0.0', 'chainflip@201')).toBe(false);
    expect(isBlockSpecLessThanVersion('2.1.0', 'chainflip@201')).toBe(true);
    expect(isBlockSpecLessThanVersion('2.2.0', 'chainflip@201')).toBe(true);

    expect(isBlockSpecLessThanVersion('2.1.0', 'chainflip@210')).toBe(false);
    expect(isBlockSpecLessThanVersion('2.2.0', 'chainflip@210')).toBe(true);

    expect(isBlockSpecLessThanVersion('2.2.0', 'chainflip@220')).toBe(false);
    expect(isBlockSpecLessThanVersion('3.0.0', 'chainflip@220')).toBe(true);

    expect(isBlockSpecLessThanVersion('3.0.0', 'chainflip@21200')).toBe(true);
    expect(isBlockSpecLessThanVersion('3.0.0', '21200')).toBe(true);
    expect(isBlockSpecLessThanVersion('2.2.0', '220')).toBe(false);
    expect(isBlockSpecLessThanVersion('3.0.0', '220')).toBe(true);
  });
});
