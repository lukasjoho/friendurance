import { prisma } from '@/lib/clients/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  const accessToken = searchParams.get('accessToken');
  const res = await fetch(
    `https://www.strava.com/api/v3/athlete/activities?per_page=100`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const activities = await res.json();

  const upsertedActivities = await prisma.$transaction(
    activities.map((activity: any) => {
      const newActivity = {
        activityId: String(activity.id),
        distance: activity.distance,
        movingTime: activity.moving_time,
        type: activity.type,
        startDate: new Date(activity.start_date),
        startLatLng: activity.start_latlng,
        user: { connect: { userId: String(userId) } },
        elevHigh: activity.elev_high,
        maxSpeed: activity.max_speed,
        averageSpeed: activity.average_speed,
        calories: activity.calories,
        averageWatts: activity.average_watts,
        kilojoules: activity.kilojoules,
        maxWatts: activity.max_watts,
        elapsedTime: activity.elapsed_time,
        kudosCount: activity.kudos_count,
        photosCount: activity.total_photo_count,
      };
      return prisma.activity.upsert({
        where: { activityId: String(activity.id) },
        update: newActivity,
        create: newActivity,
      });
    })
  );

  return NextResponse.json(upsertedActivities);
}
