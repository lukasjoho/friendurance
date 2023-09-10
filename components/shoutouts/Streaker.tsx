import { prisma } from '@/lib/prisma';
import ShoutoutCard from '../ShoutoutCard';

const Streaker = async () => {
  const usersSortedByActivityCount = await prisma.activity.groupBy({
    by: ['userId'],
    _count: {
      userId: true,
    },
    where: {
      startDate: {
        gte: new Date(new Date().setDate(new Date().getDate() - 28)),
      },
    },
    orderBy: {
      _count: {
        userId: 'desc',
      },
    },
  });

  const userIdWithMostActivities = usersSortedByActivityCount[0].userId;

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
      description="activities"
    />
  );
};

export default Streaker;
