import Footer from '@/components/Footer';
import React, { FC } from 'react';

interface SiteLayoutProps {
  children: React.ReactNode;
}

const SiteLayout: FC<SiteLayoutProps> = ({ children }) => {
  return (
    <div className="flex grow flex-col gap-16 pt-8 md:gap-32 md:pt-16">
      <div className="grow">{children}</div>
      <Footer />
    </div>
  );
};

export default SiteLayout;
