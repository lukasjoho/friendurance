import { prisma } from '@/lib/prisma';
import ShoutoutCard from '../ShoutoutCard';

const Explorer = async () => {
  //get user with largest variance in start coordinates in last 28 days
  const usersWithActivities = await prisma.user.findMany({
    include: {
      activities: {
        where: {
          startDate: {
            gte: new Date(new Date().setDate(new Date().getDate() - 28)),
          },
        },
      },
    },
  });
  function haversineDistance([lat1, lon1]: any, [lat2, lon2]: any) {
    const R = 6371; // Earth radius in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  }

  const usersDistances = usersWithActivities.map((user) => {
    let totalDistance = 0;
    let count = 0;

    for (let i = 0; i < user.activities.length; i++) {
      if (
        !user.activities[i].startLatLng ||
        // @ts-ignore
        user.activities[i].startLatLng?.length !== 2
      )
        continue;
      for (let j = i + 1; j < user.activities.length; j++) {
        if (
          !user.activities[j].startLatLng ||
          //   @ts-ignore
          user.activities[j].startLatLng?.length !== 2
        )
          continue;
        totalDistance += haversineDistance(
          user.activities[i].startLatLng,
          user.activities[j].startLatLng
        );
        count++;
      }
    }

    return {
      userId: user.userId,
      avgDistance: count === 0 ? 0 : totalDistance / count,
    };
  });
  const explorerDistance = usersDistances.sort(
    (a, b) => b.avgDistance - a.avgDistance
  )[0];
  const explorer = usersWithActivities.find(
    (user) => user.userId === explorerDistance.userId
  );
  return (
    <ShoutoutCard
      user={explorer}
      symbol="🌎"
      label="Explorer"
      metric={Number(explorerDistance.avgDistance.toFixed(0))}
      annotation="km"
      description="Avg. km's between activities"
    />
  );
};

export default Explorer;
