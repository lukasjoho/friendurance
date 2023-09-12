import { upsertUser } from '@/lib/service';
import { getStravaUser } from '@/lib/strava';
import { setTokens } from '@/lib/tokens';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.nextUrl);
  const code = searchParams.get('code');
  const { access_token, refresh_token, athlete } = await getStravaUser(
    code as string
  );
  setTokens(access_token, refresh_token);
  const upsertedUser = {
    access_token: access_token,
    refresh_token: refresh_token,
    ...athlete,
  };
  await upsertUser(upsertedUser);
  return NextResponse.redirect(new URL('/team', req.url));
}
