import * as fs from 'fs/promises';
import { describe, expect, it, vi } from 'vitest';
import CodeGenerator from '../CodeGenerator';

vi.mock('fs/promises');

const primitives = [
  'i8',
  'u8',
  'i16',
  'u16',
  'i32',
  'u32',
  'Percent',
  'Permill',
  'u64',
  'u128',
  'U256',
  'AccountId32',
  'H160',
  'H256',
  'Call',
  'Bytes',
  'bool',
  'null',
] as const;

describe(CodeGenerator, () => {
  it('generates a lot of stuff', async () => {
    const modules = [
      ...new CodeGenerator().generate({
        Primitives: Object.fromEntries(
          primitives.map((name) => [name, { type: 'primitive', name }]),
        ),
        Structs: {
          EventOne: {
            type: 'struct',
            fields: {
              ...Object.fromEntries(primitives.map((name) => [name, { type: 'primitive', name }])),
              ...Object.fromEntries(
                primitives.map((name) => [
                  `${name}Nullable`,
                  { type: 'option', value: { type: 'primitive', name } },
                ]),
              ),
              u32Array: {
                type: 'array',
                value: {
                  type: 'primitive',
                  name: 'u32',
                },
              },
              u32ArrayWithLength: {
                type: 'array',
                length: 3,
                value: {
                  type: 'primitive',
                  name: 'u32',
                },
              },
              bytes: {
                type: 'array',
                length: 32,
                value: {
                  type: 'primitive',
                  name: 'u8',
                },
              },
              tuple: {
                type: 'tuple',
                values: [
                  { type: 'primitive', name: 'u32' },
                  { type: 'primitive', name: 'bool' },
                  { type: 'primitive', name: 'AccountId32' },
                ],
              },
              range: {
                type: 'range',
                value: { type: 'primitive', name: 'u128' },
              },
              map: {
                type: 'map',
                key: {
                  type: 'tuple',
                  values: [
                    { type: 'primitive', name: 'AccountId32' },
                    { type: 'primitive', name: 'u32' },
                  ],
                },
                value: {
                  type: 'struct',
                  name: 'mapValue',
                  fields: {
                    value: { type: 'primitive', name: 'u32' },
                    moneySymbol: {
                      type: 'enum',
                      name: 'moneySymbol',
                      values: [{ name: 'Flip', value: { type: 'primitive', name: 'null' } }],
                    },
                  },
                },
              },
              flattenedEnumThing: {
                type: 'enum',
                name: 'enumWithFlattenedField',
                values: [
                  {
                    name: 'One',
                    value: {
                      type: 'struct',
                      fields: { field: { type: 'primitive', name: 'u32' } },
                    },
                  },
                ],
              },
              arrayOfIdentifiers: {
                type: 'array',
                value: {
                  type: 'enum',
                  name: 'moneySymbol',
                  values: [{ name: 'Flip', value: { type: 'primitive', name: 'null' } }],
                },
              },
            },
          },
        },
        Enums: {
          EventOne: {
            type: 'enum',
            name: 'myEnum',
            values: [
              ...primitives.map((name) => ({ name, value: { type: 'primitive' as const, name } })),
            ],
          },
        },
      }),
    ];

    for (const module of modules) {
      expect(await module.toFormattedString()).toMatchSnapshot(module['name']);
    }
  });

  it('generates nothing for an empty spec', () => {
    expect([...new CodeGenerator().generate({})]).toEqual([]);
  });

  it('filters on selected events', async () => {
    const modules = [
      ...new CodeGenerator({ trackedEvents: new Set(['Enums.EventOne']) }).generate({
        Primitives: Object.fromEntries(
          primitives.map((name) => [name, { type: 'primitive', name }]),
        ),
        Enums: {
          EventOne: {
            type: 'enum',
            name: 'myEnum',
            values: [
              { name: 'Flip', value: { type: 'primitive', name: 'null' } },
              { name: 'Usdc', value: { type: 'primitive', name: 'null' } },
              { name: 'Eth', value: { type: 'primitive', name: 'null' } },
            ],
          },
        },
      }),
    ];

    for (const module of modules) {
      expect(await module.toFormattedString()).toMatchSnapshot(module['name']);
    }
  });

  it('throws if it does not find the expected event', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const it = new CodeGenerator({ trackedEvents: new Set(['Enums.EventOne']) }).generate({
      Primitives: Object.fromEntries(primitives.map((name) => [name, { type: 'primitive', name }])),
    });

    expect(() => it.next()).toThrowErrorMatchingInlineSnapshot(
      `[Error: Not all events were generated]`,
    );
    expect(console.error).toHaveBeenCalled();
  });

  it('throws on unhandled types', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => [
      ...new CodeGenerator().generate({
        // @ts-expect-error -- that's the point
        Primitives: Object.fromEntries(
          primitives.map((name) => [name, { type: 'some new type', name }]),
        ),
      }),
    ]).toThrowErrorMatchingInlineSnapshot(`[Error: Unsupported type: some new type]`);
    expect(console.error).toHaveBeenCalled();
  });

  it('generates a named struct once', async () => {
    const modules = [
      ...new CodeGenerator().generate({
        PalletOne: {
          EventOne: {
            type: 'struct',
            name: 'reusedStruct',
            fields: {
              field: { type: 'primitive', name: 'u32' },
            },
          },
          AnotherEvent: {
            type: 'struct',
            name: 'reusedStruct',
            fields: {
              field: { type: 'primitive', name: 'u32' },
            },
          },
        },
      }),
    ];

    for (const module of modules) {
      expect(await module.toFormattedString()).toMatchSnapshot(module['name']);
    }
  });

  it('throws on unsupported primitives', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => [
      ...new CodeGenerator().generate({
        Primitives: {
          Event: { type: 'primitive', name: 'unknown' },
        },
      }),
    ]).toThrowErrorMatchingInlineSnapshot(`[Error: Unsupported primitive: unknown]`);
    expect(console.error).toHaveBeenCalled();
  });

  it('writes a formateted module to disk', async () => {
    const spy = vi.spyOn(fs, 'writeFile');

    const modules = [
      ...new CodeGenerator().generate({
        PalletOne: {
          EventOne: {
            type: 'struct',
            name: 'reusedStruct',
            fields: {
              field: { type: 'primitive', name: 'u32' },
            },
          },
        },
      }),
    ];

    for (const module of modules) {
      await module.writeFile('topLevelDir');
    }

    expect(spy.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "topLevelDir/palletOne/eventOne.ts",
          "import { z } from 'zod';
      import { reusedStruct } from '../common';

      export const palletOneEventOne = reusedStruct;
      ",
          "utf8",
        ],
        [
          "topLevelDir/common.ts",
          "import { z } from 'zod';

      export const reusedStruct = z.object({ field: z.number() });
      ",
          "utf8",
        ],
      ]
    `);
  });
});
