import { prisma } from '@/lib/prisma';
import React, { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Container from './Container';
import { User } from '@/lib/types';

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
  if (users.length < 1) {
    return false;
  }
  return (
    <Container>
      <div className="flex-start flex gap-4 overflow-scroll">
        {users.map((user: any) => {
          return <UserItem user={user} />;
        })}
      </div>
    </Container>
  );
};

export default UserShowcase;

interface UserItemProps {
  user: User;
}

const UserItem: FC<UserItemProps> = ({ user }) => {
  const { imageUrl, firstName, lastName, userStats } = user;
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border p-6">
      <Avatar className="h-20 w-20">
        <AvatarImage src={imageUrl ?? undefined} />
        <AvatarFallback>
          {firstName?.charAt(0) + '' + lastName?.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <span className="font-medium">{firstName}</span>
      <div>
        <Discipline
          emoji="🏃"
          text={metersToKilometers(userStats?.recentRunDistance || 0)}
        />
        <Discipline
          emoji="🚴"
          text={metersToKilometers(userStats?.recentRideDistance || 0)}
        />
        <Discipline
          emoji="🏊"
          text={metersToKilometers(userStats?.recentSwimDistance || 0)}
        />
      </div>
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

function metersToKilometers(meters: any) {
  return (meters / 1000).toFixed(2);
}
