import { getStravaUserSingle } from '@/lib/strava';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  console.log('START API', req.cookies.get('accessToken'));
  const stravaUser = await getStravaUserSingle();
  // const athleteId = stravaUser?.id;
  // const dbUser = await prisma.user.findUnique({
  //   where: {
  //     userId: String(athleteId),
  //   },
  // });
  return NextResponse.json({ stravaUser });
}
