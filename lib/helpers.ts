import { cookies } from 'next/headers';
import { dateRanges } from './data/dateRanges';

export function transformDate(dateStr: string) {
  const date = new Date(dateStr);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // months start from 0 in JS
  const day = String(date.getUTCDate()).padStart(2, '0');

  return `${year}/${month}/${day}`;
}

export function secondsToHoursMinutes(seconds: number) {
  if (!seconds) return '0min';
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}min`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else {
    return `${minutes}min`;
  }
}

export function convertMetersToKilometers(
  meters: number | undefined | null,
  withDecimals = true
) {
  if (!meters) return '0';
  if (withDecimals) {
    return (meters / 1000).toFixed(2);
  }
  return (meters / 1000).toFixed(0);
}

export function formatDate(isoString: string) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const date = new Date(isoString);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return `${month} ${day}, ${year}`;
}

export function getDateFromDays(days: number): Date {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
}

export async function getCookieValue(cookieKey: string) {
  const cookieStore = cookies();
  const cookie = cookieStore.get(cookieKey);
  const cookieValue = cookie?.value;
  return cookieValue;
}

export async function getDaysFromDateRange(dateRange: string) {
  let activeDateRange = dateRange;
  let allowedDateRanges = dateRanges.map((range) => range.value);
  if (!allowedDateRanges.includes(dateRange)) {
    activeDateRange = 'last-month';
  }
  const currentDateRange = dateRanges.find(
    (range) => range.value === activeDateRange
  );
  return currentDateRange?.days;
}

export async function wait() {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(true);
      }, 2000);
    } catch (error) {
      reject(false);
    }
  });
}
