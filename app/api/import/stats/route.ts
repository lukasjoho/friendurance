import { fetcher } from '@/lib/fetcher';
import { prisma } from '@/lib/prisma';
import { getStravaUserSingle } from '@/lib/strava';
import { NextResponse } from 'next/server';

export async function GET() {
  const stravaUser = await getStravaUserSingle();

  const [userStats, error] = await fetcher(
    `https://www.strava.com/api/v3/athletes/${String(stravaUser.id)}/stats`
  );

  const newStats = {
    recentRunDistance: userStats.recent_run_totals.distance,
    recentRideDistance: userStats.recent_ride_totals.distance,
    recentSwimDistance: userStats.recent_swim_totals.distance,
    recentRunCount: userStats.recent_run_totals.count,
    recentRideCount: userStats.recent_ride_totals.count,
    recentSwimCount: userStats.recent_swim_totals.count,
    user: { connect: { userId: String(stravaUser.id) } },
  };

  const upsertedUserStats = await prisma.userStats.upsert({
    where: {
      userId: String(stravaUser.id),
    },
    update: { ...newStats },
    create: {
      ...newStats,
      user: { connect: { userId: String(stravaUser.id) } },
    },
  });

  return NextResponse.json({ upsertedUserStats, error });
}
