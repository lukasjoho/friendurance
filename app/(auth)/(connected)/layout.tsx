import { getAuthUser } from '@/lib/db';
import { redirect } from 'next/navigation';

const ConnectedLayout = async ({ children }: any) => {
  const user = await getAuthUser();
  if (!user?.hasConnected) {
    redirect('/connect');
  }
  return <>{children}</>;
};

export default ConnectedLayout;
