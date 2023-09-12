import Gallery from '@/components/Gallery';
import { hasActivitiesAndStats } from '@/lib/db';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

const DashboardPage = async () => {
  const user = await hasActivitiesAndStats();
  if (!user) {
    redirect('/connect');
  }
  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <Suspense fallback={<p>Loading.....</p>}>
        <Gallery />
      </Suspense>
    </div>
  );
};

export default DashboardPage;
