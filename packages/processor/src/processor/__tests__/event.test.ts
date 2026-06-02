import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { defineEvent } from '../event';

const schema = z.object({ swapRequestId: z.number(), amount: z.number() });

describe('defineEvent', () => {
  it('bundles the name and schema', () => {
    const event = defineEvent('Swapping.SwapExecuted', schema);
    expect(event.name).toBe('Swapping.SwapExecuted');
    expect(event.schema).toBe(schema);
    expect(event.schema.parse({ swapRequestId: 1, amount: 2 })).toEqual({
      swapRequestId: 1,
      amount: 2,
    });
  });

  it('preserves the name through .refine() and narrows the schema', () => {
    const event = defineEvent('Swapping.SwapExecuted', schema).refine((e) => e.swapRequestId === 7);

    expect(event.name).toBe('Swapping.SwapExecuted');
    expect(event.schema.safeParse({ swapRequestId: 7, amount: 2 }).success).toBe(true);
    expect(event.schema.safeParse({ swapRequestId: 8, amount: 2 }).success).toBe(false);
  });

  it('keeps the name across chained .refine() calls', () => {
    const event = defineEvent('Swapping.SwapExecuted', schema)
      .refine((e) => e.swapRequestId === 7)
      .refine((e) => e.amount > 0);

    expect(event.name).toBe('Swapping.SwapExecuted');
    expect(event.schema.safeParse({ swapRequestId: 7, amount: 2 }).success).toBe(true);
    expect(event.schema.safeParse({ swapRequestId: 7, amount: 0 }).success).toBe(false);
  });
});
