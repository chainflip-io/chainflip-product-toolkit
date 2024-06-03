type Handler<T extends string, U> = {
  name: T;
  handler: U;
};

type NameWithSpec<T extends string> = `${T}-${number}`;

const groupBy = <T, K>(arr: T[], fn: (el: T) => K) =>
  arr.reduce((acc, el) => {
    const key = fn(el);
    acc.set(key, [...(acc.get(key) || []), el]);
    return acc;
  }, new Map<K, T[]>());

const groupHandlersBySpec = <T extends string, U>(
  handlersWithSpecs: (Handler<T, U> & { spec: number })[],
) => {
  const grouped = groupBy(handlersWithSpecs, (handler) => handler.spec);

  return [...grouped.entries()].map(([spec, handlers]) => ({
    spec,
    handlers: handlers.map(({ handler, name }) => ({ name, handler })),
  }));
};

export default class HandlerMap<T extends string, U> {
  private cache: Partial<Record<NameWithSpec<T>, U | null>> = {};

  private handlersByName: Record<T, { spec: number; handler: U }[]>;

  constructor(specs: (Handler<T, U> & { spec: number })[]) {
    this.handlersByName = groupHandlersBySpec(specs)
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
