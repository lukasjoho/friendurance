import Header from '@/components/Header';
import {
  din,
  fingerpaint,
  inter,
  mechepro,
  oswald,
  tungsten,
} from '@/lib/fonts';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import './globals.css';

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
        className={`${din.variable} ${fingerpaint.variable} ${mechepro.variable} ${tungsten.variable} ${oswald.variable} ${inter.className}`}
      >
        <main
          className="font-din flex flex-col align-middle"
          style={{ height: '100dvh' }}
        >
          <Header />

          {children}
          <Toaster
            toastOptions={{
              // Define default options
              duration: 4000,
              success: {
                style: {
                  background: 'rgb(34 197 94)',
                  color: 'white',
                },
                iconTheme: {
                  primary: 'white',
                  secondary: 'rgb(34 197 94)',
                },
              },
              error: {
                style: {
                  background: 'rgb(239 68 68)',
                  color: 'white',
                },

                iconTheme: {
                  primary: 'white',
                  secondary: 'rgb(239 68 68)',
                },
              },
            }}
          />
        </main>
        <Analytics />
      </body>
    </html>
  );
}
