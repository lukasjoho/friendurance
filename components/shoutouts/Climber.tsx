import { prisma } from '@/lib/prisma';
import ShoutoutCard from '../ShoutoutCard';

const Climber = async () => {
  //get user with highest elevation gain
  const usersSortedByElevationGain = await prisma.activity.groupBy({
    by: ['userId'],
    _sum: {
      elevHigh: true,
    },
    where: {
      startDate: {
        gte: new Date(new Date().setDate(new Date().getDate() - 28)),
      },
    },
    orderBy: {
      _sum: {
        elevHigh: 'desc',
      },
    },
  });
  const userIdWithHighestElevationGain = usersSortedByElevationGain[0].userId;
  const user = await prisma.user.findUnique({
    where: {
      userId: userIdWithHighestElevationGain,
    },
  });
  const elevationGain = usersSortedByElevationGain[0]._sum.elevHigh?.toFixed(0);
  if (!user || !elevationGain) return <>dssada</>;
  return (
    <ShoutoutCard
      user={user}
      symbol="⛰️"
      label="Climber"
      metric={Number(elevationGain)}
      annotation="m"
      description="total elevation gain"
    />
  );
};

export default Climber;
