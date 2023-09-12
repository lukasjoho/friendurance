import getDateFromCookie from '@/lib/helpers/getDateFromCookie';
import { prisma } from '@/lib/prisma';
import ShoutoutCard from '../ShoutoutCard';

const LightningCyclist = async ({ slug }: { slug: string }) => {
  const date = await getDateFromCookie();

  const activities = await prisma.activity.groupBy({
    by: ['userId'],
    where: {
      type: 'Ride',
      user: {
        teams: {
          some: {
            slug,
          },
        },
      },
      startDate: {
        gte: date,
      },
    },
    _avg: {
      averageSpeed: true,
    },
    orderBy: {
      _avg: {
        averageSpeed: 'desc',
      },
    },
  });
  const user = await prisma.user.findUnique({
    where: {
      userId: activities[0].userId,
    },
  });

  const speedInKmPerHour = (
    (activities[0]._avg.averageSpeed! * 60 * 60) /
    1000
  ).toFixed(2);
  // const avgSpeed = activityDataGroupedByUser._avg.distance! /
  //   activityDataGroupedByUser._avg.movingTime! || 0,
  // return <pre>{JSON.stringify(activities, null, 2)}</pre>;
  return (
    <ShoutoutCard
      user={user}
      symbol="🚴"
      label="Cyclone"
      metric={Number(speedInKmPerHour)}
      annotation="km/h"
      description="Average speed"
    />
  );
};

export default LightningCyclist;
