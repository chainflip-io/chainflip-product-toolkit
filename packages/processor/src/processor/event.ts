import { type z } from 'zod';

/**
 * A generated event: its on-chain `Pallet.Event` name bundled with the zod schema
 * for its payload. Built by {@link defineEvent} in codegen, one per event, alongside
 * the bare schema. Use `.refine(...)` to narrow to events whose decoded payload
 * satisfies a predicate — it preserves the name, so the two never drift apart.
 */
export type EventDescriptor<N extends string = string, Z extends z.ZodTypeAny = z.ZodTypeAny> = {
  /** On-chain event name, `Pallet.Event`. */
  readonly name: N;
  /** The event payload schema (the bare generated schema, possibly refined via `.refine`). */
  readonly schema: Z;
  /** Narrow to events whose decoded payload satisfies `refinement` (wraps zod `.refine`,
   *  so the predicate may return any truthy/falsy value, matching zod's `.refine`). */
  refine(refinement: (data: z.infer<Z>) => unknown): EventDescriptor<N, z.ZodEffects<Z>>;
};

/**
 * Construct an {@link EventDescriptor}. `z.infer<z.ZodEffects<Z>>` equals `z.infer<Z>`,
 * so the decoded payload type is preserved across any number of chained `.refine()` calls.
 */
export function defineEvent<const N extends string, Z extends z.ZodTypeAny>(
  name: N,
  schema: Z,
): EventDescriptor<N, Z> {
  return {
    name,
    schema,
    refine: (refinement) => defineEvent(name, schema.refine(refinement)),
  };
}
