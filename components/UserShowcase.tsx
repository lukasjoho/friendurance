import { prisma } from '@/lib/prisma';
import { User } from '@/lib/types';
import { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const UserShowcase = async () => {
  const users = await prisma.user.findMany({
    where: {
      NOT: [
        {
          activities: {
            none: {},
          },
        },
        {
          userStats: {
            is: null,
          },
        },
      ],
    },
    include: {
      userStats: true,
      activities: true,
    },
  });

  return (
    <Card className="grow">
      <CardHeader>
        <CardTitle className="text-xl">Friends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex-start flex gap-4 overflow-scroll">
          {users.map((user: any, idx) => {
            return <UserItem key={idx} user={user} />;
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserShowcase;

interface UserItemProps {
  user: User;
}

const UserItem: FC<UserItemProps> = ({ user }) => {
  const { imageUrl, firstName, lastName, userStats } = user;

  const metrics = {
    run: {
      avg: userStats?.recentRunDistance! / userStats?.recentRunCount!,
      sum: userStats?.recentRunDistance,
    },
    ride: {
      avg: userStats?.recentRideDistance! / userStats?.recentRideCount!,
      sum: userStats?.recentRideDistance,
    },
  };

  return (
    <div className="flex shrink-0 flex-col items-center gap-2 rounded-xl border p-4">
      <Avatar className="h-16 w-16">
        <AvatarImage src={imageUrl ?? undefined} />
        <AvatarFallback>
          {firstName?.charAt(0) + '' + lastName?.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <span className="font-medium">{firstName}</span>
      <div className="space-y-4 md:space-y-8">
        <div className="space-y-2">
          <h3 className="border-b pb-1 text-sm font-medium">🏃 Running</h3>
          <div className="grid grid-cols-2 gap-4">
            <CardMetric
              label="Avg"
              value={metrics.run.avg}
              annotation="km/run"
            />
            <CardMetric label="Total" value={metrics.run.sum} annotation="km" />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="border-b pb-1 text-sm font-medium">🏃 Biking</h3>
          <div className="grid grid-cols-2 gap-4">
            <CardMetric
              label="Avg"
              value={metrics.ride.avg}
              annotation="km/run"
            />
            <CardMetric
              label="Total"
              value={metrics.ride.sum}
              annotation="km"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
interface CardMetricProps {
  label: string;
  value: number | undefined | null;
  annotation: string;
}
const CardMetric: FC<CardMetricProps> = ({ label, value, annotation }) => {
  return (
    <div>
      <p className="text-2xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="font-medium">
        {metersToKilometers(value || 0)}
        <span className="text-xs font-normal"> {annotation}</span>
      </p>
    </div>
  );
};

interface DisciplineProps {
  emoji: string;
  text?: string | number;
}

const Discipline: FC<DisciplineProps> = ({ emoji, text }) => {
  return (
    <div className="flex items-center justify-center gap-1">
      <div>{emoji}</div>
      <p>{text}km</p>
    </div>
  );
};

export function metersToKilometers(meters: any) {
  return (meters / 1000).toFixed(2);
}
