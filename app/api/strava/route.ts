import { prisma } from '@/lib/clients/prisma';
import { upsertUser } from '@/lib/service';
import { getStravaUser } from '@/lib/strava';
import { setTokens } from '@/lib/tokens';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.nextUrl);
  const code = searchParams.get('code');
  const inviteId = searchParams.get('invite_id');
  console.log('INVITE ID: ', inviteId);
  const { access_token, refresh_token, athlete } = await getStravaUser(
    code as string
  );
  let invite;
  if (inviteId) {
    invite = await prisma.invite.findUnique({
      where: {
        id: inviteId,
      },
      include: {
        team: true,
      },
    });
  }
  setTokens(access_token, refresh_token);
  const upsertedUser = {
    access_token: access_token,
    refresh_token: refresh_token,
    teamInvitedSlug: invite?.team.slug,
    ...athlete,
  };
  await upsertUser(upsertedUser);
  return NextResponse.redirect(new URL('/team', req.url));
}
