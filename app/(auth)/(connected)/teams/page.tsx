import Container from '@/components/Container';
import { TeamAvatar } from '@/components/UserAvatar';
import AvatarsListing from '@/components/shared/AvatarsListing';
import CreateTeamButton from '@/components/shared/CreateTeamButton';

import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { prisma } from '@/lib/clients/prisma';
import { getAuthUser } from '@/lib/db';
import { cn } from '@/lib/utils';
import { HeartCrack } from 'lucide-react';
import Link from 'next/link';

const TeamsPage = () => {
  return (
    <div className="flex grow items-center justify-center">
      <Container className="flex justify-center">
        <TeamsOverview />
      </Container>
    </div>
  );
};

export default TeamsPage;

const TeamsOverview = async () => {
  const user = await getAuthUser();
  const teams = await prisma.team.findMany({
    include: {
      members: true,
    },
    // where: {
    //   slug: {
    //     notIn: ['friendurance-demo-team'],
    //   },
    // },
    where: {
      OR: [
        {
          members: {
            some: {
              userId: user?.userId,
            },
          },
        },
        {
          slug: {
            in: ['friendurance-demo-team'],
          },
        },
      ],
    },
  });
  return (
    <div className="flex grow flex-col items-center justify-center py-8 md:py-16">
      <Card className="min-w-[300px] max-w-[350px]">
        <CardHeader>
          <CardTitle>Teams</CardTitle>
          <CardDescription>Join a team or create your own.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {teams.length > 0 ? (
            <>
              {teams.map((team) => (
                <Link
                  key={team.id}
                  href={
                    team.slug === 'friendurance-demo-team'
                      ? '/demoteam'
                      : `/team/${team.slug}`
                  }
                  className={cn(
                    buttonVariants({ variant: 'secondary' }),
                    'flex w-full items-center justify-start gap-3 overflow-scroll py-8'
                  )}
                >
                  <TeamAvatar team={team} className="h-9 w-9" />
                  <p className="whitespace-nowrap text-lg">{team.name}</p>
                  <AvatarsListing users={team.members} max={3} />
                </Link>
              ))}
              <p className="text-center text-sm text-muted-foreground">or</p>
            </>
          ) : (
            <div className="flex flex-col items-center py-4">
              <HeartCrack className="h-16 w-16" />
              <p className="text-center text-sm text-muted-foreground">
                You are not yet part of any team
              </p>
            </div>
          )}
          <CreateTeamButton />
        </CardContent>
      </Card>
    </div>
  );
};
