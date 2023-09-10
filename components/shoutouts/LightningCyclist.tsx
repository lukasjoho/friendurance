import { prisma } from '@/lib/prisma';
import ShoutoutCard from '../ShoutoutCard';

const LightningCyclist = async () => {
  const activity = await prisma.activity.findFirst({
    where: {
      type: 'Ride',
    },
    orderBy: {
      averageSpeed: 'desc',
    },
    include: {
      user: true,
    },
  });
  // const user = await prisma.user.findUnique({
  //   where: {
  //     userId: activity._max.userId ?? undefined,
  //   },
  // });
  if (!activity?.averageSpeed) return false;

  const speedInKmPerHour = ((activity?.averageSpeed * 60 * 60) / 1000).toFixed(
    2
  );

  return (
    <ShoutoutCard
      user={activity.user}
      symbol="🚴"
      label="Cyclone"
      metric={Number(speedInKmPerHour)}
      annotation="km/h"
      description="highest average speed"
    />
  );
};

export default LightningCyclist;
