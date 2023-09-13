import Footer from '@/components/Footer';
import React, { FC } from 'react';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: FC<AppLayoutProps> = async ({ children }) => {
  return (
    <div className="flex grow flex-col">
      {/* <TeamspaceHeader /> */}

      {/* <PopUpWrapper /> */}
      {children}
      <div className="mt-16 md:mt-32">
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
