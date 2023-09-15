'use client';
import { ModalProvider } from '@/components/shared/modal';
import React from 'react';
import { Toaster } from 'react-hot-toast';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ModalProvider>
      {children}
      <Toaster />
    </ModalProvider>
  );
};

export default Providers;
