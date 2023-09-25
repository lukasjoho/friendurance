import Container from '@/components/layout/Container';
import TeamHeader from '@/components/layout/headers/teamheader/TeamHeader';
import Map from '@/components/modules/Map/Map';
import Shoutouts from '@/components/modules/Shoutouts';
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
  if (slug !== 'friendurance-demo-team') {
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
  }
  return (
    <div className="grow  space-y-3 md:space-y-8">
      {/* passing slugs down here through prop drilling. This could also be solved with server context store or accessing headers in component to avoid prop drilling. */}
      <TeamHeader slug={slug} />
      <Container className="space-y-3 md:space-y-8">
        <AthletesStats slug={slug} />
        <Shoutouts slug={slug} />
        <Map slug={slug} />
      </Container>
    </div>
  );
};

export default TeamPage;
