import { vi, describe, it, expect } from 'vitest';
import HandlerMap, { parseSemver } from '../HandlerMap';

const handlers = [
  {
    spec: '1.0.0',
    handlers: [
      { name: 'heartbeat', handler: vi.fn().mockName('heartbeat-0') },
      { name: 'other', handler: vi.fn().mockName('other-0') },
      { name: 'third', handler: vi.fn().mockName('third-0') },
    ],
  },
  {
    spec: '1.1.0',
    handlers: [
      { name: 'heartbeat', handler: vi.fn().mockName('heartbeat-1') },
      { name: 'new-event', handler: vi.fn().mockName('new-event-1') },
    ],
  },
  {
    spec: '1.2.0',
    handlers: [
      { name: 'heartbeat', handler: null },
      { name: 'other', handler: vi.fn().mockName('other-2') },
    ],
  },
] as const;

describe(HandlerMap, () => {
  type DeepMutable<T> =
    T extends Record<string, unknown>
      ? { -readonly [K in keyof T]: DeepMutable<T[K]> }
      : T extends readonly unknown[]
        ? DeepMutable<T[number]>[]
        : T;

  const handlerMap = new HandlerMap(handlers as unknown as DeepMutable<typeof handlers>);

  it.each([
    ['heartbeat', 'chainflip-node@100', handlers[0].handlers[0].handler],
    ['heartbeat', 'chainflip-node@110', handlers[1].handlers[0].handler],
    ['heartbeat', 'chainflip-node@120', null],
    ['heartbeat', 'chainflip-node@130', null],
    //
    ['third', 'chainflip-node@100', handlers[0].handlers[2].handler],
    ['third', 'chainflip-node@110', handlers[0].handlers[2].handler],
    ['third', 'chainflip-node@120', handlers[0].handlers[2].handler],
    ['third', 'chainflip-node@125', handlers[0].handlers[2].handler],
    ['third', 'chainflip-node@10215', handlers[0].handlers[2].handler],
    ['third', 'chainflip-node@130', handlers[0].handlers[2].handler],
    //
    ['other', 'chainflip-node@100', handlers[0].handlers[1].handler],
    ['other', 'chainflip-node@110', handlers[0].handlers[1].handler],
    ['other', 'chainflip-node@10110', handlers[0].handlers[1].handler],
    ['other', 'chainflip-node@120', handlers[2].handlers[1].handler],
    //
    ['new-event', 'chainflip-node@100', null],
    ['new-event', 'chainflip-node@110', handlers[1].handlers[1].handler],
    ['new-event', 'chainflip-node@120', handlers[1].handlers[1].handler],
  ] as const)(
    'returns the correct handler for the event name (%s) and spec id (%s)',
    (name, spec, expected) => {
      expect(handlerMap.getHandler(name, spec)).toBe(expected);
    },
  );
});

describe(parseSemver, () => {
  it.each([
    ['chainflip-node@120', '1.2.0'],
    ['chainflip-node@141', '1.4.1'],
    ['chainflip-node@10800', '1.8.0'],
    ['chainflip-node@10803', '1.8.3'],
  ])('returns the spec number', (specId, specNumber) => {
    expect(parseSemver(specId)).toBe(specNumber);
  });

  it('throws an error for incorrect spec ids', () => {
    expect(() => parseSemver('chainflip-node')).toThrowError();
    expect(() => parseSemver('140')).toThrowError();
  });
});
