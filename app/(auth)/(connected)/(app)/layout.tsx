import Footer from '@/components/Footer';
import TeamspaceHeader from '@/components/TeamspaceHeader';
import React, { FC } from 'react';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: FC<AppLayoutProps> = async ({ children }) => {
  return (
    <div className="flex grow flex-col gap-3 md:gap-8">
      <TeamspaceHeader />

      {/* <PopUpWrapper /> */}
      {children}
      <div className="mt-16 md:mt-32">
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
