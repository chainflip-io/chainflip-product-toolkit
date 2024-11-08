import { utc, type UTCDate } from '@date-fns/utc';
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  type Interval,
  intervalToDuration,
  eachDayOfInterval,
  endOfDay,
  startOfDay,
} from 'date-fns';
import { isNullish } from './guard';

const pluralize = (word: string, numb: number): string => (numb !== 1 ? `${word}s` : word);
const pad = (number: number) => String(number).padStart(2, '0');

export const toISODateString = (date: Date) => date.toISOString().slice(0, 10);

export const fromUnixTime = (time: string | number): Date => {
  const date = new Date(Number(time) * 1000);

  if (Number.isNaN(date.valueOf())) {
    throw new Error('date is invalid');
  }

  return date;
};

export const formatTimestamp = (
  timestamp: string,
  locale: string | undefined = undefined,
  timeZone: undefined | 'UTC' = undefined,
): string =>
  new Date(timestamp).toLocaleString(locale, {
    timeZone,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZoneName: 'short',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });

export const formatTimestampShort = (
  timestamp: string,
  locale: string | undefined = undefined,
  timeZone: undefined | 'UTC' = undefined,
): string =>
  new Date(timestamp).toLocaleString(locale, {
    timeZone,
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });

export const differenceInTimeAgo = (
  time: string,
  ago = true,
  endTime = new Date().toISOString(),
): string => {
  const end = new Date(endTime);
  const timeNumber = Date.parse(time);
  const seconds = differenceInSeconds(end, timeNumber);

  if (seconds < 60) return `${seconds} sec${ago ? ' ago' : ''}`;

  const minutes = differenceInMinutes(end, timeNumber);
  if (minutes < 60) return `${minutes} min${ago ? ' ago' : ''}`;

  const hours = differenceInHours(end, timeNumber);
  if (hours < 48) return `${hours} ${pluralize('hour', hours)}${ago ? ' ago' : ''}`;

  const days = differenceInDays(end, timeNumber);
  return `${days} days${ago ? ' ago' : ''}`;
};

// eg: "1h 2min 3s", "1day 2h 3min 4s"
export const intervalToDurationWords = (interval: Interval): string => {
  if (isNullish(interval.start) || isNullish(interval.end)) return '??';
  if (interval.end === 0) return '??';

  const duration = intervalToDuration(interval);

  if (duration.months) return '>1 month';
  if (duration.days) {
    return `${pad(duration.days)}${duration.days === 1 ? 'day' : 'days'} ${pad(
      duration.hours ?? 0,
    )}h ${pad(duration.minutes ?? 0)}min ${pad(duration.seconds ?? 0)}s`;
  }
  if (duration.hours) {
    return `${pad(duration.hours)}h ${pad(duration.minutes ?? 0)}min ${pad(duration.seconds ?? 0)}s`;
  }
  if (duration.minutes) return `${pad(duration.minutes)}min ${pad(duration.seconds ?? 0)}s`;
  if (duration.seconds) return `${pad(duration.seconds)}s`;
  return 'A few seconds';
};

export const toStartOfUtcDayString = (date: Date) => startOfDay(date, { in: utc }).toISOString();

export const toEndOfUtcDayString = (date: Date) => endOfDay(date, { in: utc }).toISOString();

export const eachUtcDayOfInterval = (interval: { start: Date; end: Date }) =>
  eachDayOfInterval(interval, { in: utc }) as UTCDate[];
