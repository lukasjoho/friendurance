import { upsertUser } from '@/lib/service';
import { getTokens, getStravaUser } from '@/lib/strava';
import { setTokens } from '@/lib/tokens';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.nextUrl);
  const code = searchParams.get('code');
  const tokens = await getTokens(code as string);
  setTokens(tokens.access_token, tokens.refresh_token);
  const stravaUser = await getStravaUser();
  const dbUser = await upsertUser(stravaUser);
  return NextResponse.redirect(new URL('/dashboard', req.url));
}
