import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatMPerSecondToKmPerHour = (mPerSecond: number) => {
  return (mPerSecond * 3.6).toFixed(2);
};

export const formatMToKm = (m: number) => {
  return (m / 1000).toFixed(2);
};

export const isServer = () => typeof window === 'undefined';

export function slugify(str: string) {
  return str
    .toLowerCase() // Convert the string to lowercase
    .trim() // Trim spaces at the beginning and end of the string
    .replace(/[^a-z0-9\s]/g, '') // Remove non-alphanumeric characters (excluding spaces)
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
    .replace(/^-|-$/g, ''); // Remove leading and trailing hyphens if present
}

export function formatDate(isoDate: string) {
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
  const date = new Date(isoDate);
  const month = months[date.getMonth()];
  const day = date.getDate();
  return `${month} ${day}`;
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

export function formatToEmoji(value: string): string {
  const key = value.toLowerCase();
  const mapper = {
    run: '🏃',
    ride: '🚴',
  };
  if (key in mapper) {
    return mapper[key as keyof typeof mapper];
  }
  return value;
}
