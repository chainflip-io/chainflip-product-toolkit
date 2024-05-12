export const deferredPromise = <T>(): {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (error: Error) => void;
} => {
  let resolve!: (value: T) => void;
  let reject!: (error: Error) => void;

  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve, reject };
};

export type DeferredPromise<T> = ReturnType<typeof deferredPromise<T>>;

export const sleep = (ms: number, opts: { signal?: AbortSignal } = {}): Promise<void> =>
  new Promise<void>((resolve) => {
    const timeout = setTimeout(resolve, ms);
    if (opts.signal) {
      const clear = () => {
        clearTimeout(timeout);
        resolve();
        opts.signal!.removeEventListener('abort', clear);
      };
      opts.signal.addEventListener('abort', clear);
    }
  });

export class Queue {
  private promise = Promise.resolve();

  constructor(private readonly debounce?: number) {}

  enqueue<T, Args extends any[]>(fn: (...args: Args) => Promise<T>, ...args: Args): Promise<T> {
    return new Promise((resolve, reject) => {
      this.promise = this.promise.then(async () => {
        const sleepPromise = this.debounce ? sleep(this.debounce) : Promise.resolve();
        await Promise.all([fn(...args).then(resolve, reject), sleepPromise]);
      });
    });
  }
}

export class RateLimiter<T, Args extends any[]> {
  fn;
  debounce;
  queues: Queue[];
  index = 0;

  constructor(opts: {
    fn: (...args: Args) => Promise<T>;
    debounce: number;
    maxConcurrency: number;
  }) {
    this.fn = opts.fn;
    this.debounce = opts.debounce;
    this.queues = Array.from({ length: opts.maxConcurrency }, () => new Queue(this.debounce));
  }

  request(...args: Args): Promise<T> {
    const nextIndex = this.index;
    this.index = (this.index + 1) % this.queues.length;
    return this.queues[nextIndex].enqueue(this.fn, ...args);
  }
}
