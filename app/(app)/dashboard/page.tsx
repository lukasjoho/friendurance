import Container from '@/components/Container';
import Gallery from '@/components/Gallery';
import Map from '@/components/Map/Map';
import Climber from '@/components/shoutouts/Climber';
import Explorer from '@/components/shoutouts/Explorer';
import FlashRunner from '@/components/shoutouts/FlashRunner';
import Grinder from '@/components/shoutouts/Grinder';
import LightningCyclist from '@/components/shoutouts/LightningCyclist';
import Streaker from '@/components/shoutouts/Streaker';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
      {/* <Container>
        <HeatMap />
      </Container> */}
      <Container>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Shoutouts</CardTitle>
            <CardDescription>High-performers in last 30 days.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Streaker />
              <Climber />
              <Grinder />
              <LightningCyclist />
              <FlashRunner />
              <Explorer />
            </div>
          </CardContent>
        </Card>
      </Container>
      <Suspense fallback={<p>Loading.....</p>}>
        <Gallery />
      </Suspense>

      <Map />
    </div>
  );
};

export default DashboardPage;
