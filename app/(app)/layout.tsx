import Footer from '@/components/Footer';
import Header from '@/components/Header';
import PopUpWrapper from '@/components/PopUpWrapper';
import TeamspaceHeader from '@/components/TeamspaceHeader';
import React, { FC } from 'react';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex grow flex-col gap-4 md:gap-8">
      <div>
        <Header />
        <TeamspaceHeader />
      </div>

      <PopUpWrapper />
      {children}
      <div className="mt-16 md:mt-32">
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
