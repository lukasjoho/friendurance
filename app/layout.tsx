import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Friendurance - ',
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
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col">
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
      </body>
    </html>
  );
}
