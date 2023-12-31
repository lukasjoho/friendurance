import Footer from '@/components/layout/Footer';
import React, { FC } from 'react';

interface SiteLayoutProps {
  children: React.ReactNode;
}

const SiteLayout: FC<SiteLayoutProps> = ({ children }) => {
  return (
    <div className="flex grow flex-col gap-16 md:gap-32">
      <div className="grow">{children}</div>
      <Footer />
    </div>
  );
};

export default SiteLayout;
