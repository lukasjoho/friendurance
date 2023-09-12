import Connect from '@/components/Connect';
import { hasActivitiesAndStats } from '@/lib/db';
import { redirect } from 'next/navigation';

const ConnectPage = async () => {
  const user = await hasActivitiesAndStats();
  if (user) {
    redirect('/dashboard');
  }
  return (
    <div className="flex grow items-center justify-center">
      <Connect />
    </div>
  );
};

export default ConnectPage;
