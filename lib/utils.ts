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
