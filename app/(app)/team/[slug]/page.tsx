import Container from '@/components/Container';
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
      <Container>
        <AthletesStats />
      </Container>
    </div>
  );
};

export default TeamPage;
