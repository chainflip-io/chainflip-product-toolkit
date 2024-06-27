import { describe, expect, it } from 'vitest';
import { noop } from '../utils';

describe(noop, () => {
  it('does nothing', () => {
    expect(noop()).toBeUndefined();
  });
});
