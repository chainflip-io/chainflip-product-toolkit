import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest';
import { Queue, RateLimiter, sleep } from '../async.ts';

describe(sleep, () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should resolve after the given time', async () => {
    const mock = vi.fn();
    sleep(1000).then(mock);
    await vi.advanceTimersByTimeAsync(999);
    expect(mock).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1);
    expect(mock).toHaveBeenCalled();
  });

  it('can be aborted', async () => {
    const mock = vi.fn();
    const controller = new AbortController();
    sleep(1000, { signal: controller.signal }).then(mock);
    controller.abort();
    await vi.advanceTimersByTimeAsync(1);
    expect(mock).toHaveBeenCalled();
  });
});

describe(Queue, () => {
  it('runs the functions in order', async () => {
    const queue = new Queue();

    const mock = vi.fn((letter: string, repeat: number) => Promise.resolve(letter.repeat(repeat)));

    const a = queue.enqueue(mock, 'a', 1);
    const b = queue.enqueue(mock, 'b', 2);
    const c = queue.enqueue(mock, 'c', 3);

    expect(mock).not.toHaveBeenCalledTimes(1);
    expect(await a).toEqual('a');
    expect(mock).toHaveBeenCalledTimes(1);
    await b;
    expect(await b).toEqual('bb');
    expect(mock).toHaveBeenCalledTimes(2);
    await c;
    expect(await c).toEqual('ccc');
    expect(mock).toHaveBeenCalledTimes(3);
  });
});

describe(RateLimiter, () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('limits the function to the given concurrency and rate', async () => {
    const mock = vi.fn((base: number) => Promise.resolve(base ** 2));

    const limiter = new RateLimiter({ fn: mock, debounce: 100, maxConcurrency: 3 });

    const results: number[] = [];
    const push = (value: number) => results.push(value);

    Array.from({ length: 10 }).forEach((_, i) => {
      limiter.request(i + 1).then(push);
    });

    await vi.advanceTimersByTimeAsync(0);
    expect(mock).toHaveBeenCalledTimes(3);
    expect(results).toEqual([1, 4, 9]);
    await vi.advanceTimersByTimeAsync(100);
    expect(mock).toHaveBeenCalledTimes(6);
    expect(results).toEqual([1, 4, 9, 16, 25, 36]);
    await vi.advanceTimersByTimeAsync(100);
    expect(mock).toHaveBeenCalledTimes(9);
    expect(results).toEqual([1, 4, 9, 16, 25, 36, 49, 64, 81]);
    await vi.advanceTimersByTimeAsync(100);
    expect(mock).toHaveBeenCalledTimes(10);
    expect(results).toEqual([1, 4, 9, 16, 25, 36, 49, 64, 81, 100]);
  });
});
