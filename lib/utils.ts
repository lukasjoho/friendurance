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
