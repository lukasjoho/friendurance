import { prisma } from '@/lib/clients/prisma';
import { getStravaActivityById } from '@/lib/strava';
import { NextResponse } from 'next/server';

export async function GET() {
  //get last 10 photos across all activities
  const activities = await prisma.activity.findMany({
    where: {
      photosCount: {
        gt: 0,
      },
    },
    orderBy: {
      startDate: 'desc',
    },
    take: 10,
  });
  const photos = await Promise.all(
    activities.map(async (activity) => {
      const stravaActivity = await getStravaActivityById(activity.activityId);
      const photo = stravaActivity.photos.primary.urls['600'];
      return {
        activityId: activity.activityId,
        photo: photo,
      };
    })
  );
  const upsertedActivitiesWithPhotos = await prisma.$transaction(
    photos.map((photo) => {
      return prisma.activity.update({
        where: { activityId: String(photo.activityId) },
        data: { photo: photo.photo },
      });
    })
  );
  return NextResponse.json(upsertedActivitiesWithPhotos);
}
