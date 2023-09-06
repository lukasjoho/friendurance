import { fetcher } from '@/lib/fetcher';
import { prisma } from '@/lib/prisma';
import { getStravaUser } from '@/lib/strava';
import { NextResponse } from 'next/server';

export async function GET() {
  const stravaUser = await getStravaUser();
  const [activities, error] = await fetcher(
    `https://www.strava.com/api/v3/athlete/activities?per_page=100`
  );

  const upsertedActivities = await prisma.$transaction(
    activities.map((activity: any) => {
      const newActivity = {
        activityId: String(activity.id),
        distance: activity.distance,
        movingTime: activity.moving_time,
        type: activity.type,
        startDate: new Date(activity.start_date),
        startLatLng: activity.start_latlng,
        user: { connect: { userId: String(stravaUser.id) } },
      };
      return prisma.activity.upsert({
        where: { activityId: String(activity.id) },
        update: newActivity,
        create: newActivity,
      });
    })
  );

  return NextResponse.json({ upsertedActivities, error });
}
