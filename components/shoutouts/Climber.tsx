import getDateFromCookie from '@/lib/helpers/getDateFromCookie';
import { prisma } from '@/lib/prisma';
import ShoutoutCard from '../ShoutoutCard';

const Climber = async ({ slug }: { slug: string }) => {
  //get user with highest elevation gain
  const date = await getDateFromCookie();
  const usersSortedByElevationGain = await prisma.activity.groupBy({
    by: ['userId'],
    _sum: {
      elevHigh: true,
    },
    where: {
      user: {
        teams: {
          some: {
            slug,
          },
        },
      },
      type: {
        in: ['Run', 'Ride', 'Hike'],
      },
      startDate: {
        gte: date,
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
      description="Total elevation gain"
    />
  );
};

export default Climber;
