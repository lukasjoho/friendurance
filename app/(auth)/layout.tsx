import { getAuthUser } from '@/lib/db';
import { redirect } from 'next/navigation';
import React from 'react';

const AuthLayout = async ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const user = await getAuthUser();
  if (!user) {
    redirect('/login');
  }
  return <>{children}</>;
};

export default AuthLayout;
