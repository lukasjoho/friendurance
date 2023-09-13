import Container from '@/components/Container';
import CurrentTeamSetter from '@/components/CurrentTeamSetter';
import Map from '@/components/Map/Map';
import Shoutouts from '@/components/shoutouts';
import AthletesStats from '@/components/teamboard/AthletesStats';
import { getAuthUser, getTeams } from '@/lib/db';

export async function generateStaticParams() {
  const teams = await getTeams();
  return teams.map((team: any) => ({
    slug: team.slug,
  }));
}

const TeamPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const user = await getAuthUser();
  const allowed = user?.teams?.some((team: any) => team.slug === slug);
  // if (!allowed) {
  //   redirect('/unauthorized');
  // }
  return (
    <div className="grow">
      <CurrentTeamSetter user={user} />
      <Container className="space-y-3 md:space-y-8">
        <div className="flex items-stretch gap-4 md:gap-8">
          <AthletesStats slug={slug} />
          {/* <div className="min-w-[400px] ">
            <TeamRadar />
          </div> */}
        </div>
        <Shoutouts slug={slug} />
        <Map slug={slug} />
      </Container>
    </div>
  );
};

export default TeamPage;
