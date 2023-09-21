import Container from '@/components/Container';
import Map from '@/components/Map/Map';
import TeamspaceHeader from '@/components/TeamspaceHeader';
import Shoutouts from '@/components/shoutouts';
import AthletesStats from '@/components/teamboard/AthletesStats';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ShieldAlert } from 'lucide-react';

const TeamPage = async () => {
  return (
    <div className="grow  space-y-3 md:space-y-8">
      <TeamspaceHeader slug="friendurance-demo-team" />
      <Container>
        <Alert variant="warning">
          <ShieldAlert />
          <AlertTitle>This is a demo space.</AlertTitle>
          <AlertDescription>
            This is a team for demo purposes. Browse around, but you are not
            able to join this team.
          </AlertDescription>
        </Alert>
      </Container>
      <Container className="space-y-3 md:space-y-8">
        <div className="flex items-stretch gap-4 md:gap-8">
          <AthletesStats slug="friendurance-demo-team" />
        </div>
        <Shoutouts slug="friendurance-demo-team" />
        <Map slug="friendurance-demo-team" />
      </Container>
    </div>
  );
};

export default TeamPage;
