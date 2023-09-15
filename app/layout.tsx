import Header from '@/components/Header';
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${din.variable} ${tungsten.variable} ${inter.className}`}
      >
        <main className="flex flex-col font-din" style={{ height: '100dvh' }}>
          <Providers>
            <Header />
            {children}
          </Providers>
        </main>
        <Analytics />
      </body>
    </html>
  );
}
