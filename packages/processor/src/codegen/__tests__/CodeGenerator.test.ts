import * as fs from 'fs/promises';
import { describe, expect, it, vi } from 'vitest';
import { spyOn } from '@/testing';
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
          primitives.map((value) => [value, { type: 'primitive', value }]),
        ),
        Structs: {
          EventOne: {
            type: 'struct',
            fields: {
              ...Object.fromEntries(
                primitives.map((value) => [value, { type: 'primitive', value }]),
              ),
              ...Object.fromEntries(
                primitives.map((value) => [
                  `${value}Nullable`,
                  { type: 'option', value: { type: 'primitive', value } },
                ]),
              ),
              u32Array: {
                type: 'array',
                value: {
                  type: 'primitive',
                  value: 'u32',
                },
              },
              u32ArrayWithLength: {
                type: 'array',
                length: 3,
                value: {
                  type: 'primitive',
                  value: 'u32',
                },
              },
              bytes: {
                type: 'array',
                length: 32,
                value: {
                  type: 'primitive',
                  value: 'u8',
                },
              },
              tuple: {
                type: 'tuple',
                values: [
                  { type: 'primitive', value: 'u32' },
                  { type: 'primitive', value: 'bool' },
                  { type: 'primitive', value: 'AccountId32' },
                ],
              },
              range: {
                type: 'range',
                value: { type: 'primitive', value: 'u128' },
              },
              map: {
                type: 'map',
                key: {
                  type: 'tuple',
                  values: [
                    { type: 'primitive', value: 'AccountId32' },
                    { type: 'primitive', value: 'u32' },
                  ],
                },
                value: {
                  type: 'struct',
                  $name: 'mapValue',
                  fields: {
                    value: { type: 'primitive', value: 'u32' },
                    moneySymbol: {
                      type: 'enum',
                      $name: 'moneySymbol',
                      values: [{ name: 'Flip', value: { type: 'primitive', value: 'null' } }],
                    },
                  },
                },
              },
              flattenedEnumThing: {
                type: 'enum',
                $name: 'enumWithFlattenedField',
                values: [
                  {
                    name: 'One',
                    value: {
                      type: 'struct',
                      fields: { field: { type: 'primitive', value: 'u32' } },
                    },
                  },
                ],
              },
              arrayOfIdentifiers: {
                type: 'array',
                value: {
                  type: 'enum',
                  $name: 'moneySymbol',
                  values: [{ name: 'Flip', value: { type: 'primitive', value: 'null' } }],
                },
              },
            },
          },
        },
        Enums: {
          EventOne: {
            type: 'enum',
            $name: 'myEnum',
            values: [
              ...primitives.map((name) => ({
                name,
                value: { type: 'primitive' as const, value: name },
              })),
            ],
          },
        },
      }),
    ];

    for (const module of modules) {
      // eslint-disable-next-line dot-notation
      expect(await module.toFormattedString()).toMatchSnapshot(module['name']);
    }
  });

  it('generates nothing for an empty spec', () => {
    expect([...new CodeGenerator().generate({})]).toEqual([]);
  });

  it('filters on selected events', async () => {
    const modules = [
      ...new CodeGenerator({ trackedItems: new Set(['Enums.EventOne']) }).generate({
        Primitives: Object.fromEntries(
          primitives.map((value) => [value, { type: 'primitive', value }]),
        ),
        Enums: {
          EventOne: {
            type: 'enum',
            $name: 'myEnum',
            values: [
              { name: 'Flip', value: { type: 'primitive', value: 'null' } },
              { name: 'Usdc', value: { type: 'primitive', value: 'null' } },
              { name: 'Eth', value: { type: 'primitive', value: 'null' } },
            ],
          },
        },
      }),
    ];

    for (const module of modules) {
      // eslint-disable-next-line dot-notation
      expect(await module.toFormattedString()).toMatchSnapshot(module['name']);
    }
  });

  it('throws if it does not find the expected event', () => {
    spyOn(console, 'error').mockImplementation(() => {});
    const iter = new CodeGenerator({ trackedItems: new Set(['Enums.EventOne']) }).generate({
      Primitives: Object.fromEntries(
        primitives.map((value) => [value, { type: 'primitive', value }]),
      ),
    });

    expect(() => iter.next()).toThrowErrorMatchingInlineSnapshot(
      `[Error: Not all items were generated]`,
    );
    expect(console.error).toHaveBeenCalled();
  });

  it('throws on unhandled types', () => {
    spyOn(console, 'error').mockImplementation(() => {});

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
            $name: 'reusedStruct',
            fields: {
              field: { type: 'primitive', value: 'u32' },
            },
          },
          AnotherEvent: {
            type: 'struct',
            $name: 'reusedStruct',
            fields: {
              field: { type: 'primitive', value: 'u32' },
            },
          },
        },
      }),
    ];

    for (const module of modules) {
      // eslint-disable-next-line dot-notation
      expect(await module.toFormattedString()).toMatchSnapshot(module['name']);
    }
  });

  it('generates the encoded address enum', async () => {
    const modules = [
      ...new CodeGenerator().generate({
        PalletOne: {
          EventOne: {
            type: 'enum',
            $name: 'cfChainsAddressEncodedAddress',
            values: [
              { name: 'Eth', value: { type: 'primitive', value: 'null' } },
              { name: 'Dot', value: { type: 'primitive', value: 'null' } },
              { name: 'Sol', value: { type: 'primitive', value: 'null' } },
              { name: 'Btc', value: { type: 'primitive', value: 'null' } },
              { name: 'Arb', value: { type: 'primitive', value: 'null' } },
            ],
          },
        },
      }),
    ];

    for (const module of modules) {
      // eslint-disable-next-line dot-notation
      expect(await module.toFormattedString()).toMatchSnapshot(module['name']);
    }
  });

  it('throws for new chains', () => {
    expect(() => [
      ...new CodeGenerator().generate({
        PalletOne: {
          EventOne: {
            type: 'enum',
            $name: 'cfChainsAddressEncodedAddress',
            values: [
              { name: 'Eth', value: { type: 'primitive', value: 'null' } },
              { name: 'Dot', value: { type: 'primitive', value: 'null' } },
              { name: 'Sol', value: { type: 'primitive', value: 'null' } },
              { name: 'Btc', value: { type: 'primitive', value: 'null' } },
              { name: 'Arb', value: { type: 'primitive', value: 'null' } },
              { name: 'Ton', value: { type: 'primitive', value: 'null' } },
            ],
          },
        },
      }),
    ]).toThrowErrorMatchingInlineSnapshot(`[Error: unknown chain: "Ton"]`);
  });

  it('throws on unsupported primitives', () => {
    spyOn(console, 'error').mockImplementation(() => {});
    expect(() => [
      ...new CodeGenerator().generate({
        Primitives: {
          Event: { type: 'primitive', value: 'unknown' },
        },
      }),
    ]).toThrowErrorMatchingInlineSnapshot(`[Error: Unsupported primitive: unknown]`);
    expect(console.error).toHaveBeenCalled();
  });

  it('writes a formatted module to disk', async () => {
    const spy = spyOn(fs, 'writeFile');

    const modules = [
      ...new CodeGenerator().generate({
        PalletOne: {
          EventOne: {
            type: 'struct',
            $name: 'reusedStruct',
            fields: {
              field: { type: 'primitive', value: 'u32' },
            },
          },
        },
      }),
    ];

    for (const module of modules) {
      await module.writeFile(
        'topLevelDir',
        module.isCommon() ? 'hello world, this is a changelog' : undefined,
      );
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
        [
          "topLevelDir/CHANGELOG.md",
          "hello world, this is a changelog",
          "utf8",
        ],
      ]
    `);
  });
});
