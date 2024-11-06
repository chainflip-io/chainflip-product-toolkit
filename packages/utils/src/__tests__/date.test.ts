import { Interval } from 'date-fns';
import { describe, expect, it, vi } from 'vitest';
import {
  differenceInTimeAgo,
  eachUtcDayOfInterval,
  formatTimestamp,
  formatTimestampShort,
  fromUnixTime,
  intervalToDurationWords,
  toEndOfUtcDayString,
  toISODateString,
  toStartOfUtcDayString,
} from '../date';

const now = Date.now();

describe('toISODateString', () => {
  it('formats date', () => {
    expect(toISODateString(new Date('2022-03-14T00:00:00.000Z'))).toBe('2022-03-14');
  });
});

describe('Date', () => {
  it('fromUnixTime', () => {
    expect(fromUnixTime(1626860700).toISOString()).toBe('2021-07-21T09:45:00.000Z');
  });
});

describe('formatTimestamp', () => {
  it('formats timestamp', () => {
    expect(formatTimestamp('2022-03-14T00:00:00.000Z', 'en-US', 'UTC')).toBe(
      'Mon, Mar 14, 2022, 12:00:00 AM UTC',
    );
  });
});

describe('formatTimestampShort', () => {
  it('formats timestamp', () => {
    expect(formatTimestampShort('2022-03-14T00:00:00.000Z', 'en-US', 'UTC')).toBe(
      '3/14/2022, 12:00:00 AM',
    );
  });
});

describe('differenceInTimeAgo', () => {
  it.each([
    ['0 sec', 0],
    ['1 sec', 1000],
    ['59 sec', 59000],
    ['1 min', 60000],
    ['59 min', 3540000],
    ['1 hour', 3600000],
    ['23 hours', 82800000],
    ['24 hours', 86400000],
    ['47 hours', 170400000],
    // ['2 days', 172800000], // TODO: ignored because of Daylight saving issue
  ])('displays the proper time as %s ago', (expected, time) => {
    vi.spyOn(Date, 'now').mockImplementation(() => now);
    expect(differenceInTimeAgo(new Date(Date.now() - time).toISOString(), false)).toBe(expected);
  });

  it.each([
    ['0 sec ago', 0],
    ['1 hour ago', 3600000],
    ['47 hours ago', 170400000],
  ])('displays the proper time as %s ago', (expected, time) => {
    vi.spyOn(Date, 'now').mockImplementation(() => now);
    expect(differenceInTimeAgo(new Date(Date.now() - time).toISOString())).toBe(expected);
  });
});

describe('intervalToDurationWords', () => {
  it.each([
    [{ start: 0, end: 1000 }, '01s'],
    [{ start: 0, end: 10000 }, '10s'],
    [{ start: 0, end: 100000 }, '01min 40s'],
    [{ start: 0, end: 1000000 }, '16min 40s'],
    [{ start: 0, end: 10000000 }, '02h 46min 40s'],
    [{ start: 0, end: 100000000 }, '01day 03h 46min 40s'],
    [{ start: 0, end: 0 }, '??'],
    [{ start: null, end: 100 }, '??'],
    [{ start: 10, end: undefined }, '??'],
    [{ start: new Date('01-01-2023'), end: new Date('01-02-2023') }, '01day 00h 00min 00s'],
    [{ start: new Date('01-01-2023'), end: new Date('02-01-2023') }, '>1 month'],
    // reverse start and end stays the same
    [{ start: new Date('02-01-2023'), end: new Date('01-01-2023') }, '>1 month'],
  ])('displays the proper time as %s ago', (actual, expected) => {
    expect(intervalToDurationWords(actual as Interval)).toBe(expected);
  });
});

describe('toStartOfUtcDayString', () => {
  it.each([
    ['2022-03-14T12:00:00.000Z', '2022-03-14T00:00:00.000Z'],
    ['2022-03-14T23:59:00.000Z', '2022-03-14T00:00:00.000Z'],
  ])('gets the start of the day', (time, expected) => {
    expect(toStartOfUtcDayString(new Date(time))).toBe(expected);
  });
});

describe('toEndOfUtcDayString', () => {
  it.each([
    ['2022-03-14T12:00:00.000Z', '2022-03-14T23:59:59.999Z'],
    ['2022-03-14T23:59:00.000Z', '2022-03-14T23:59:59.999Z'],
  ])('gets the start of the day', (time, expected) => {
    expect(toEndOfUtcDayString(new Date(time))).toBe(expected);
  });
});

describe('eachUtcDayOfInterval', () => {
  const expectedOutput = [
    '2022-03-08T00:00:00.000Z',
    '2022-03-09T00:00:00.000Z',
    '2022-03-10T00:00:00.000Z',
    '2022-03-11T00:00:00.000Z',
    '2022-03-12T00:00:00.000Z',
  ];
  it('handles happy case', () => {
    const result = eachUtcDayOfInterval({
      start: new Date('2022-03-08T00:00:00.000Z'),
      end: new Date('2022-03-12T00:00:00.000Z'),
    });
    expect(result.map((item) => item.toISOString())).toEqual(expectedOutput);
  });

  it('handles start and end of the day', () => {
    process.env.TZ = 'GMT';
    const result = eachUtcDayOfInterval({
      start: new Date('2022-03-08T00:00:00.000Z'),
      end: new Date('2022-03-12T23:59:00.000Z'),
    });
    expect(result.map((item) => item.toISOString())).toEqual(expectedOutput);
  });
});
