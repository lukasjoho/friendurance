import { prisma } from '@/lib/prisma';
import ShoutoutCard from '../ShoutoutCard';

const FlashRunner = async () => {
  const activity = await prisma.activity.findFirst({
    where: {
      type: 'Run',
    },
    orderBy: {
      averageSpeed: 'desc',
    },
    include: {
      user: true,
    },
  });
  if (!activity?.averageSpeed) return false;

  const speedInKmPerHour = ((activity?.averageSpeed * 60 * 60) / 1000).toFixed(
    2
  );
  return (
    <ShoutoutCard
      user={activity.user}
      symbol="🏃"
      label="Pace Maker"
      metric={Number(speedInKmPerHour)}
      annotation="km/h"
      description="highest average speed"
    />
  );
};

export default FlashRunner;
