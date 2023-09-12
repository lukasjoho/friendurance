import Container from '@/components/Container';
import Map from '@/components/Map/Map';
import Shoutouts from '@/components/shoutouts';
import AthletesStats from '@/components/teamboard/AthletesStats';
import { getTeams } from '@/lib/db';

export async function generateStaticParams() {
  const teams = await getTeams();
  return teams.map((team: any) => ({
    slug: team.slug,
  }));
}

const TeamPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  return (
    <div className="grow">
      <Container className="space-y-3 md:space-y-8">
        <AthletesStats slug={slug} />
        <Shoutouts slug={slug} />
        <Map slug={slug} />
      </Container>
    </div>
  );
};

export default TeamPage;
