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
        <Toaster />
      </ModalProvider>
    </QueryClientProvider>
  );
};

export default Providers;
