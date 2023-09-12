import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React, { FC } from 'react';

interface ImportLayoutProps {
  children: React.ReactNode;
}

const ImportLayout: FC<ImportLayoutProps> = ({ children }) => {
  return (
    <div className="flex grow flex-col gap-4 md:gap-8">
      <Header />

      {children}
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default ImportLayout;
