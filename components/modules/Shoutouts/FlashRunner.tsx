import { prisma } from '@/lib/clients/prisma';
import getDateFromCookie from '@/lib/helpers/getDateFromCookie';
import ShoutoutCard from './ShoutoutCard';

const FlashRunner = async ({ slug }: { slug: string }) => {
  const date = await getDateFromCookie();
  const activities = await prisma.activity.groupBy({
    by: ['userId'],
    where: {
      type: 'Run',
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
  if (!activities[0]) {
    return (
      <ShoutoutCard
        user={null}
        symbol="🏃"
        label="Pace Maker"
        metric={0}
        annotation="km/h"
        description="Average speed"
      />
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      userId: activities[0].userId,
    },
  });

  const speedInKmPerHour = (
    (activities[0]._avg.averageSpeed! * 60 * 60) /
    1000
  ).toFixed(2);
  return (
    <ShoutoutCard
      user={user}
      symbol="🏃"
      label="Pace Maker"
      metric={Number(speedInKmPerHour)}
      annotation="km/h"
      description="Average speed"
    />
  );
};

export default FlashRunner;
