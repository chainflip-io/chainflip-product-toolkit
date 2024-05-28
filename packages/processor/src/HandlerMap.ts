type Handler<T extends string, U> = {
  name: T;
  handler: U;
};
type NonEmptyArray<T> = readonly [T, ...T[]];

type NameWithSpec<T extends string> = `${T}-${number}`;

export default class HandlerMap<T extends string, U> {
  private cache: Partial<Record<NameWithSpec<T>, U | null>> = {};

  private handlersByName: Record<T, { spec: number; handler: U }[]>;

  constructor(
    specs: NonEmptyArray<{
      spec: number;
      handlers: NonEmptyArray<Handler<T, U>>;
    }>,
  ) {
    this.handlersByName = specs
      .toSorted((a, b) => b.spec - a.spec)
      .flatMap(({ spec, handlers }) =>
        handlers.map(({ name, handler }) => ({ spec, name, handler })),
      )
      .reduce(
        (acc, { spec, name, handler }) => {
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          acc[name] ??= [];
          acc[name].push({ spec, handler });

          return acc;
        },
        // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
        {} as HandlerMap<T, U>['handlersByName'],
      );
  }

  getHandler(name: T, specId: string): U | null {
    // the specId is in the format of "chainflip-node@<specId>"
    const specNumber = Number.parseInt(specId.split('@')[1], 10);

    if (Number.isNaN(specNumber)) throw new Error('Invalid specId');

    const handlerName = `${name}-${specNumber}` as const;

    let handler: U | null | undefined = this.cache[handlerName];

    if (handler !== undefined) return handler;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const handlers = this.handlersByName[name] ?? [];

    const index = handlers.findIndex(({ spec }) => spec <= specNumber);

    handler = index === -1 ? null : handlers[index].handler;

    this.cache[handlerName] = handler;

    return handler;
  }
}
