import { Finger_Paint, Inter, Oswald } from 'next/font/google';
import localFont from 'next/font/local';

export const inter = Inter({ subsets: ['latin'] });
export const fingerpaint = Finger_Paint({
  variable: '--font-fingerpaint',
  display: 'swap',
  weight: '400',
  subsets: ['latin'],
});

export const oswald = Oswald({
  variable: '--font-oswald',
  subsets: ['latin'],
});

export const din = localFont({
  variable: '--font-din',
  display: 'swap',
  src: [
    {
      path: '../public/fonts/DINNextLTPro-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/DINNextLTPro-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
});

export const mechepro = localFont({
  variable: '--font-mechepro',
  display: 'swap',
  src: [
    {
      path: '../public/fonts/mechepro-medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/mechepro-regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/mechepro-light.woff',
      weight: '300',
      style: 'normal',
    },
  ],
});

export const tungsten = localFont({
  variable: '--font-tungsten',
  display: 'swap',
  src: [
    {
      path: '../public/fonts/Tungsten-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});
