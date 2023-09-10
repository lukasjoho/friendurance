import Container from '@/components/Container';
import Map from '@/components/Map/Map';
import TeamSummary from '@/components/TeamSummary';
import UserShowcase from '@/components/UserShowcase';
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

const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-4 md:gap-8">
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
      <Container>
        <div className="flex flex-col gap-4 md:flex-row md:gap-8">
          <UserShowcase />
          <TeamSummary />
        </div>
      </Container>
      <Map />
    </div>
  );
};

export default DashboardPage;
