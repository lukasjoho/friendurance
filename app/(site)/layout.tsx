import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React, { FC } from 'react';

interface SiteLayoutProps {
  children: React.ReactNode;
}

const SiteLayout: FC<SiteLayoutProps> = ({ children }) => {
  return (
    <div className="flex grow flex-col">
      <Header />

      {children}
      <div className="mt-16 md:mt-32">
        <Footer />
      </div>
    </div>
  );
};

export default SiteLayout;
