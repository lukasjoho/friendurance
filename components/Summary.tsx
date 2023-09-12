import { prisma } from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const Summary = async () => {
  //get user run activities within last 28 days
  const usersWithActivities = await prisma.user.findMany({
    include: {
      activities: {
        where: {
          startDate: {
            gte: new Date(new Date().setDate(new Date().getDate() - 28)),
          },
          type: {
            equals: 'Ride',
          },
        },
      },
    },
  });
  const usersWithTotalDistances = usersWithActivities.map((user: any) => {
    const totalDistance = user.activities.reduce(
      (sum: number, activity: any) => {
        return sum + (activity.distance || 0);
      },
      0
    );
    const newUser = Object.assign({ totalDistance }, user);
    return {
      value: totalDistance,
      label: user.firstName,
    };
  });
  const sortedUsers = usersWithTotalDistances.sort((a: any, b: any) => {
    return b.value - a.value;
  });
  const activities = await prisma.activity.aggregate({
    where: {
      type: {
        equals: 'Ride',
      },
    },
    _sum: {
      distance: true,
    },
    _avg: {
      distance: true,
      movingTime: true,
    },
  });
  const activitiesRun = await prisma.activity.aggregate({
    where: {
      type: {
        equals: 'Run',
      },
    },
    _sum: {
      distance: true,
    },
    _avg: {
      distance: true,
      movingTime: true,
    },
  });
  return (
    <Card className="ml-auto w-full shrink-0 rounded-xl md:w-auto">
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div>
          <div className="flex flex-col items-center">
            <div className="text-3xl">🚴 </div>
            <h3 className="text-xl font-semibold">Total Distance</h3>
            <h4>
              <pre>{JSON.stringify(activities, null, 2)}</pre>
              {activities._sum?.distance}
            </h4>
          </div>
        </div>
        <div>
          <div className="flex flex-col items-center">
            <div className="text-3xl">🚴 </div>
            <h3 className="text-xl font-semibold">Total Distance</h3>
            <h4>{activitiesRun._sum?.distance}</h4>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Summary;
