import { getAuthUser } from '@/lib/db';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
//set user as member of team. Team slug in params. User id fetched on server based on auth. Then redirect to team page.
export async function GET(req: NextRequest) {
  const url = new URL(req.nextUrl);
  const searchParams = url.searchParams;
  const teamSlug = searchParams.get('slug');
  if (!teamSlug) {
    return NextResponse.json({ error: 'No team slug provided' });
  }
  const user = await getAuthUser();
  const updatedUser = await prisma.user.update({
    where: {
      userId: user?.userId,
    },
    data: {
      teams: {
        connect: {
          slug: teamSlug,
        },
      },
    },
    include: {
      teams: true,
      currentTeam: true,
    },
  });
  redirect(`/team/${teamSlug}`);
}
