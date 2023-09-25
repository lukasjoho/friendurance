import { prisma } from '@/lib/clients/prisma';
import getDateFromCookie from '@/lib/helpers/getDateFromCookie';
import ShoutoutCard from './ShoutoutCard';

const Hustler = async ({ slug }: { slug: string }) => {
  const date = await getDateFromCookie();
  const usersSortedByActivityCount = await prisma.activity.groupBy({
    by: ['userId'],
    _count: {
      userId: true,
    },
    where: {
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
      type: {
        in: ['Run', 'Ride', 'VirtualRide', 'Swim', 'Workout'],
      },
    },
    orderBy: {
      _count: {
        userId: 'desc',
      },
    },
  });

  const userIdWithMostActivities = usersSortedByActivityCount[0]?.userId;
  if (!userIdWithMostActivities) {
    return (
      <ShoutoutCard
        user={null}
        symbol="🦾"
        label="Hustler"
        metric={0}
        description="Num. of activities"
      />
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      userId: userIdWithMostActivities,
    },
  });
  const activityCount = usersSortedByActivityCount[0]._count.userId;
  return (
    <ShoutoutCard
      user={user}
      symbol="🦾"
      label="Hustler"
      metric={activityCount}
      description="Num. of activities"
    />
  );
};

export default Hustler;
