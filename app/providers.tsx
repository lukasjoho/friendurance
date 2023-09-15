'use client';
import { ModalProvider } from '@/components/shared/modal';
import React from 'react';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <ModalProvider>{children}</ModalProvider>;
};

export default Providers;
