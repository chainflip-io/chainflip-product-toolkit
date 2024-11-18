import { type Interval } from 'date-fns';
import { describe, expect, it, vi } from 'vitest';
import {
  addUtcDays,
  differenceInTimeAgo,
  differenceInUtcDays,
  eachUtcDayOfInterval,
  formatTimestamp,
  formatTimestampShort,
  fromUnixTime,
  intervalToDurationWords,
  subUtcDays,
  toEndOfUtcDay,
  toEndOfUtcDayString,
  toISODateString,
  toStartOfUtcDay,
  toStartOfUtcDayString,
} from '../date';

const now = Date.now();

describe('toISODateString', () => {
  it('formats date', () => {
    expect(toISODateString(new Date('2022-03-14T00:00:00.000Z'))).toBe('2022-03-14');
  });
});

describe('fromUnixTime', () => {
  it('converts a timestamp', () => {
    expect(fromUnixTime(1626860700).toISOString()).toBe('2021-07-21T09:45:00.000Z');
  });

  it('throws an error for invalid date', () => {
    expect(() => fromUnixTime('abc')).toThrowError('date is invalid');
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
    ['0 sec ago', 0, true],
    ['58 min ago', 3500000, true],
    ['1 hour ago', 3600000, true],
    ['47 hours ago', 170400000, true],
    ['2 days ago', 180400000, true],
    ['0 sec', 0, false],
    ['58 min', 3500000, false],
    ['1 hour', 3600000, false],
    ['47 hours', 170400000, false],
    ['2 days', 180400000, false],
  ])('displays the proper time as %s ago', (expected, time, ago) => {
    vi.spyOn(Date, 'now').mockImplementation(() => now);
    expect(differenceInTimeAgo(new Date(Date.now() - time).toISOString(), ago)).toBe(expected);
  });
});

describe('intervalToDurationWords', () => {
  it.each([
    ['01s', { start: 0, end: 1000 }],
    ['10s', { start: 0, end: 10000 }],
    ['01min 40s', { start: 0, end: 100000 }],
    ['16min 40s', { start: 0, end: 1000000 }],
    ['02h 46min 40s', { start: 0, end: 10000000 }],
    ['01day 03h 46min 40s', { start: 0, end: 100000000 }],
    ['02days 07h 33min 20s', { start: 0, end: 200000000 }],
    ['??', { start: 0, end: 0 }],
    ['A few seconds', { start: 0, end: 1 }],
    ['??', { start: null, end: 100 }],
    ['??', { start: 10, end: undefined }],
    ['01day 00h 00min 00s', { start: new Date('01-01-2023'), end: new Date('01-02-2023') }],
    ['>1 month', { start: new Date('01-01-2023'), end: new Date('02-01-2023') }],
    // reverse start and end stays the same
    ['>1 month', { start: new Date('02-01-2023'), end: new Date('01-01-2023') }],
    ['10min 00s', { start: 1640994900000, end: 1640995500000 }],
    [
      '03h 00min 00s',
      { start: new Date('2024-11-08T10:49:55.589Z'), end: new Date('2024-11-08T13:49:55.589Z') },
    ],
  ])('displays the proper time as %s ago', (expected, input) => {
    expect(intervalToDurationWords(input as Interval)).toBe(expected);
  });
});

describe('toStartOfUtcDay', () => {
  it.each([
    ['2022-03-14T12:00:00.000Z', '2022-03-14T00:00:00.000Z'],
    ['2022-03-14T23:59:00.000Z', '2022-03-14T00:00:00.000Z'],
    ['Mon Nov 18 2024 01:00:00 GMT+0100', '2024-11-18T00:00:00.000Z'],
    ['Mon Nov 18 2024 00:00:00 GMT+0100', '2024-11-17T00:00:00.000Z'],
  ])('gets the start of the UTC day', (time, expected) => {
    expect(toStartOfUtcDay(new Date(time)).toISOString()).toBe(expected);
  });
});

describe('toEndOfUtcDay', () => {
  it.each([
    ['2022-03-14T12:00:00.000Z', '2022-03-14T23:59:59.999Z'],
    ['2022-03-14T23:59:00.000Z', '2022-03-14T23:59:59.999Z'],
    ['Mon Nov 18 2024 00:59:59 GMT+0100', '2024-11-17T23:59:59.999Z'],
    ['Mon Nov 18 2024 01:00:00 GMT+0100', '2024-11-18T23:59:59.999Z'],
    ['Mon Nov 18 2024 00:30:00 GMT+0100', '2024-11-17T23:59:59.999Z'],
  ])('gets the end of the UTC day', (time, expected) => {
    expect(toEndOfUtcDay(new Date(time)).toISOString()).toBe(expected);
  });
});

describe('toStartOfUtcDayString', () => {
  it.each([
    ['2022-03-14T12:00:00.000Z', '2022-03-14T00:00:00.000Z'],
    ['2022-03-14T23:59:00.000Z', '2022-03-14T00:00:00.000Z'],
    ['Mon Nov 18 2024 01:00:00 GMT+0100', '2024-11-18T00:00:00.000Z'],
    ['Mon Nov 18 2024 00:00:00 GMT+0100', '2024-11-17T00:00:00.000Z'],
  ])('gets the start of the UTC day in ISO string format', (time, expected) => {
    expect(toStartOfUtcDayString(new Date(time))).toBe(expected);
  });
});

describe('toEndOfUtcDayString', () => {
  it.each([
    ['2022-03-14T12:00:00.000Z', '2022-03-14T23:59:59.999Z'],
    ['2022-03-14T23:59:00.000Z', '2022-03-14T23:59:59.999Z'],
    ['Mon Nov 18 2024 00:59:59 GMT+0100', '2024-11-17T23:59:59.999Z'],
    ['Mon Nov 18 2024 01:00:00 GMT+0100', '2024-11-18T23:59:59.999Z'],
    ['Mon Nov 18 2024 00:30:00 GMT+0100', '2024-11-17T23:59:59.999Z'],
  ])('gets the start of the UTC day in ISO string format', (time, expected) => {
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

describe('subUtcDays', () => {
  it.each([
    [1, '2024-10-28T00:00:00.000Z', '2024-10-27T00:00:00.000Z'],
    [1, 'Mon Nov 27 2024 00:00:00 GMT+0100', '2024-11-25T23:00:00.000Z'],
    [4, '2024-10-28T23:59:59.000Z', '2024-10-24T23:59:59.000Z'],
    [4, 'Mon Nov 27 2024 00:00:00 GMT+0100', '2024-11-22T23:00:00.000Z'],
    [31, '2024-10-28T23:59:59.000Z', '2024-09-27T23:59:59.000Z'],
  ])(`properly subtracts %i utc days`, (days, date, expected) => {
    expect(subUtcDays(date, days).toISOString()).toBe(expected);
  });
});

describe('addUtcDays', () => {
  it.each([
    [1, '2024-10-28T00:00:00.000Z', '2024-10-29T00:00:00.000Z'],
    [1, 'Mon Nov 27 2024 00:00:00 GMT+0100', '2024-11-27T23:00:00.000Z'],
    [4, '2024-10-28T23:59:59.000Z', '2024-11-01T23:59:59.000Z'],
    [4, 'Mon Nov 20 2024 00:00:00 GMT+0100', '2024-11-23T23:00:00.000Z'],
    [31, '2024-10-28T23:59:59.000Z', '2024-11-28T23:59:59.000Z'],
  ])(`properly adds %i utc days`, (days, date, expected) => {
    expect(addUtcDays(date, days).toISOString()).toBe(expected);
  });
});

describe('differenceInUtcDays', () => {
  it.each([
    ['Mon Nov 17 2024 00:00:00 GMT+0100', 'Mon Nov 18 2024 01:00:00 GMT+0100', 1],
    ['Mon Nov 17 2024 01:00:00 GMT+0100', 'Mon Nov 18 2024 01:00:00 GMT+0100', 1],
    ['Mon Nov 17 2024 02:00:00 GMT+0200', 'Mon Nov 18 2024 01:00:00 GMT+0100', 1],
    ['Mon Nov 17 2024 02:00:00 GMT+0100', 'Mon Nov 18 2024 01:00:00 GMT+0100', 0],
    ['Mon Nov 17 2024 02:00:00 GMT+0100', 'Mon Nov 28 2024 01:00:00 GMT+0100', 10],
  ])(`properly calculates the difference in UTC days`, (start, end, expected) => {
    expect(differenceInUtcDays({ start, end })).toBe(expected);
  });
});
