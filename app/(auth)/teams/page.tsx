import Container from '@/components/Container';
import { TeamAvatar } from '@/components/UserAvatar';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getAuthUser } from '@/lib/db';
import { prisma } from '@/lib/prisma';
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
    where: {
      members: {
        some: {
          userId: user?.userId,
        },
      },
    },
  });
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Teams</CardTitle>
        <CardDescription>Join a team or create your own.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {teams.length > 0 ? (
          <>
            {teams.map((team) => (
              <Link
                href={`/team/${team.slug}`}
                className={cn(
                  buttonVariants({ variant: 'secondary' }),
                  'flex w-full items-center justify-start gap-3 py-8'
                )}
              >
                <TeamAvatar team={team} className="h-9 w-9" />
                <p className="text-lg">{team.name}</p>
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

        <Button className="w-full">Create team</Button>
      </CardContent>
    </Card>
  );
};
