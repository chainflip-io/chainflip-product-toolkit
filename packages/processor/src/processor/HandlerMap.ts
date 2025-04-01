export type Semver = `${string}.${string}.${string}`;

type Handler<T extends string, U> = {
  name: T;
  handler: U;
};

enum Cmp {
  Lt = -1,
  Eq = 0,
  Gt = 1,
}

const compareSemver = (a: Semver, b: Semver) => {
  const aParts = a.split('.').map(Number);
  const bParts = b.split('.').map(Number);

  for (let i = 0; i < 3; i += 1) {
    if (aParts[i] > bParts[i]) return Cmp.Gt;
    if (aParts[i] < bParts[i]) return Cmp.Lt;
  }

  return Cmp.Eq;
};

export const parseSemver = (specId: string): Semver => {
  // the specId is in the format of "chainflip-node@<specId>"
  const specNumber = Number.parseInt(specId.split('@')[1], 10);
  if (Number.isNaN(specNumber)) throw new Error('Invalid specId');
  const specStr = specNumber.toString();
  const segmentLength = Math.ceil(specStr.length / 3);
  const padded = specStr.padStart(segmentLength * 3, '0');
  const major = padded.slice(0, segmentLength);
  const minor = padded.slice(segmentLength, segmentLength * 2);
  const patch = padded.slice(segmentLength * 2, segmentLength * 3);
  return `${Number(major)}.${Number(minor)}.${Number(patch)}`;
};

export default class HandlerMap<T extends string, U> {
  private cache = new Map<`${T}-${Semver}`, U | null>();

  private handlersByName: Record<T, { spec: Semver; handler: U }[]>;

  constructor(
    specs: {
      spec: Semver;
      handlers: Handler<T, U>[];
    }[],
  ) {
    this.handlersByName = specs
      .toSorted((a, b) => compareSemver(b.spec, a.spec))
      .flatMap(({ spec, handlers }) =>
        handlers.map(({ name, handler }) => ({ spec, name, handler })),
      )
      .reduce(
        (acc, { spec, name, handler }) => {
          acc[name] ??= [];
          acc[name].push({ spec, handler });

          return acc;
        },
        {} as HandlerMap<T, U>['handlersByName'],
      );
  }

  getHandler(name: T, specId: string): U | null {
    const blockSemver = parseSemver(specId);

    const handlerName = `${name}-${blockSemver}` as const;

    let handler: U | null | undefined = this.cache.get(handlerName);

    if (handler !== undefined) return handler;

    const handlers = this.handlersByName[name] ?? [];

    // find the first handler that is less than or equal to the block semver
    const index = handlers.findIndex(({ spec }) => compareSemver(spec, blockSemver) !== Cmp.Gt);

    handler = index === -1 ? null : handlers[index].handler;

    this.cache.set(handlerName, handler);

    return handler;
  }
}
