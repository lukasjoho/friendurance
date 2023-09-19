import Container from '@/components/Container';
import Map from '@/components/Map/Map';
import TeamspaceHeader from '@/components/TeamspaceHeader';
import Shoutouts from '@/components/shoutouts';
import AthletesStats from '@/components/teamboard/AthletesStats';
import { prisma } from '@/lib/clients/prisma';
import { getAuthUser, getTeams } from '@/lib/db';
import { redirect } from 'next/navigation';

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
  if (!allowed) {
    redirect('/unauthorized');
  }
  await prisma.user.update({
    where: {
      userId: user?.userId,
    },
    data: {
      currentTeam: {
        connect: {
          slug: slug,
        },
      },
    },
  });

  return (
    <div className="grow  space-y-3 md:space-y-8">
      {/* <CurrentTeamSetter user={user} /> */}
      <TeamspaceHeader slug={slug} />
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
