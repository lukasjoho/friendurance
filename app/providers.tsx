'use client';
import { ModalProvider } from '@/components/shared/modal';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        {children}
        <Toaster
          toastOptions={{
            // Define default options
            duration: 3000,
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
      </ModalProvider>
    </QueryClientProvider>
  );
};

export default Providers;
