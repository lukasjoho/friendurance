import Header from '@/components/layout/header';
import { din, inter, tungsten } from '@/lib/fonts';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Friendurance',
  description:
    'Uncover the fun of collective Strava metrics. Friendurance aggregates Strava activities so that you can celebrate fitness together.',
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal?: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${din.variable} ${tungsten.variable} ${inter.className}`}
      >
        <main
          className="flex flex-col pt-12 font-din md:pt-14"
          style={{ height: '100dvh' }}
        >
          <Providers>
            <Header />
            {modal}
            {children}
          </Providers>
        </main>
        <Analytics />
      </body>
    </html>
  );
}
