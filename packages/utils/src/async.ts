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

export const sleep = (ms: number, { signal }: { signal?: AbortSignal } = {}): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  const deferred = deferredPromise<void>();

  const timeout = setTimeout(deferred.resolve, ms);

  if (signal) {
    const abort = () => {
      clearTimeout(timeout);
      deferred.resolve();
    };

    signal.addEventListener('abort', abort);

    deferred.promise = deferred.promise.finally(() => {
      signal.removeEventListener('abort', abort);
    });
  }

  return deferred.promise;
};

export class Queue {
  private promise = Promise.resolve();

  constructor(private readonly debounce?: number) {}

  enqueue<T, Args extends unknown[]>(fn: (...args: Args) => Promise<T>, ...args: Args): Promise<T> {
    return new Promise((resolve, reject) => {
      this.promise = this.promise.then(async () => {
        const sleepPromise = this.debounce ? sleep(this.debounce) : Promise.resolve();
        // eslint-disable-next-line @typescript-eslint/use-unknown-in-catch-callback-variable
        await Promise.all([fn(...args).then(resolve, reject), sleepPromise]);
      });
    });
  }
}

export class RateLimiter<T, Args extends unknown[]> {
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

export const once = async (
  target: EventTarget,
  event: string,
  opts?: { signal?: AbortSignal; timeout?: number },
): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  const deferred = deferredPromise<void>();
  const onSuccess = () => {
    target.removeEventListener('error', onError);
    deferred.resolve();
  };

  const onError = () => {
    target.removeEventListener(event, onSuccess);
    deferred.reject(new Error('error'));
  };

  target.addEventListener(event, onSuccess, { once: true, signal: opts?.signal });
  target.addEventListener('error', onError, { once: true, signal: opts?.signal });

  if (opts?.signal) {
    const signal = opts.signal;
    const abort = () => {
      deferred.reject(new Error('aborted'));
    };

    signal.addEventListener('abort', abort);

    deferred.promise = deferred.promise.finally(() => {
      signal.removeEventListener('abort', abort);
    });
  }

  if (opts?.timeout) {
    const timer = setTimeout(() => {
      deferred.reject(new Error('timeout'));
    }, opts.timeout);

    deferred.promise = deferred.promise.finally(() => {
      clearTimeout(timer);
    });
  }

  await deferred.promise;
};
