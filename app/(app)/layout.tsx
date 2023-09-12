import Footer from '@/components/Footer';
import Header from '@/components/Header';
import TeamspaceHeader from '@/components/TeamspaceHeader';
import { getAuthUser } from '@/lib/db';
import { redirect } from 'next/navigation';
import React, { FC } from 'react';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: FC<AppLayoutProps> = async ({ children }) => {
  const user = await getAuthUser();
  const currentTeamSlug = user?.currentTeam?.slug;
  if (!currentTeamSlug) {
    redirect('/teams');
  }
  return (
    <div className="flex grow flex-col gap-3 md:gap-8">
      <div className="space-y-3 md:space-y-8">
        <Header />
        <TeamspaceHeader />
      </div>

      {/* <PopUpWrapper /> */}
      {children}
      <div className="mt-16 md:mt-32">
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
