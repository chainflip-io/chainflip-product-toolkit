import { describe, expect, it } from 'vitest';
import { type ParsedMetadata } from '../BaseParser';
import { diffSpecs } from '../utils';

describe(diffSpecs, () => {
  it('returns an empty set if nothing has changed', () => {
    const a: ParsedMetadata = { pallet1: { event1: { type: 'primitive', name: 'u64' } } };

    const { changedOrAddedEvents, changelog } = diffSpecs(a, a);
    expect(changedOrAddedEvents).toEqual(new Set());
    expect(changelog).toMatchInlineSnapshot(`""`);
  });

  it('returns a set of changed events', () => {
    const a: ParsedMetadata = { pallet1: { event1: { type: 'primitive', name: 'u64' } } };
    const b: ParsedMetadata = {
      pallet1: {
        event1: {
          type: 'tuple',
          values: [
            {
              type: 'primitive',
              name: 'u64',
            },
          ],
        },
      },
    };

    const { changedOrAddedEvents, changelog } = diffSpecs(a, b);
    expect(changedOrAddedEvents).toEqual(new Set(['pallet1.event1']));
    expect(changelog).toMatchInlineSnapshot(`
      "pallet1:
        - event1:
          - undefined: added
      "
    `);
  });

  it('returns a set of added events', () => {
    const a: ParsedMetadata = { pallet1: { event1: { type: 'primitive', name: 'u64' } } };
    const b: ParsedMetadata = {
      pallet1: {
        event1: { type: 'primitive', name: 'u64' },
        event2: { type: 'primitive', name: 'u64' },
      },
    };

    const { changedOrAddedEvents, changelog } = diffSpecs(a, b);
    expect(changedOrAddedEvents).toEqual(new Set(['pallet1.event2']));
    expect(changelog).toMatchInlineSnapshot(`
      "pallet1:
        - event2: added
      "
    `);
  });

  it('returns a set of changed and added events', () => {
    const a: ParsedMetadata = { pallet1: { event1: { type: 'primitive', name: 'u64' } } };
    const b: ParsedMetadata = {
      pallet1: {
        event1: {
          type: 'tuple',
          values: [
            {
              type: 'primitive',
              name: 'u64',
            },
          ],
        },
        event2: { type: 'primitive', name: 'u64' },
      },
    };

    const { changedOrAddedEvents, changelog } = diffSpecs(a, b);
    expect(changedOrAddedEvents).toEqual(new Set(['pallet1.event1', 'pallet1.event2']));
    expect(changelog).toMatchInlineSnapshot(`
      "pallet1:
        - event1:
          - undefined: added
        - event2: added
      "
    `);
  });

  it('returns all the events from a new pallet', () => {
    const a: ParsedMetadata = { pallet1: { event1: { type: 'primitive', name: 'u64' } } };
    const b: ParsedMetadata = {
      ...a,
      pallet2: {
        event1: { type: 'primitive', name: 'u64' },
        event2: { type: 'primitive', name: 'u64' },
        event3: { type: 'primitive', name: 'u64' },
      },
    };

    const { changedOrAddedEvents, changelog } = diffSpecs(a, b);
    expect(changedOrAddedEvents).toEqual(
      new Set(['pallet2.event1', 'pallet2.event2', 'pallet2.event3']),
    );
    expect(changelog).toMatchInlineSnapshot(`
      "New or removed pallets:
        pallet2: added

      "
    `);
  });
});
