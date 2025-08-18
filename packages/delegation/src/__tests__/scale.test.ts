import { describe, expect, it } from 'vitest';
import { serializeDelegationCall } from '../scale.js';

describe(serializeDelegationCall, () => {
  it('throws for unsupported call types', () => {
    expect(() =>
      serializeDelegationCall({
        // @ts-expect-error type doesn't exist
        call: 'unsupported',
      }),
    ).toThrow('Unsupported call type');
  });
});
