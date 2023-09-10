import { prisma } from '@/lib/prisma';
import ShoutoutCard from '../ShoutoutCard';

const Grinder = async () => {
  const users: any[] = await prisma.user.findMany({});

  const isConsecutive = (isoDate1: string | null, isoDate2: string | null) => {
    if (!isoDate1 || !isoDate2) return false;
    const date1 = new Date(isoDate1);
    const date2 = new Date(isoDate2);
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 1;
  };

  let maxStreak = 0;
  let grinderUserId: any;
  for (let user of users) {
    const userActivities = await prisma.activity.findMany({
      where: {
        userId: user.userId,
      },
      orderBy: {
        startDate: 'asc',
      },
    });
    let currentStreak = 0;
    let longestStreak = 0;
    for (let i = 1; i < userActivities.length; i++) {
      if (
        isConsecutive(
          userActivities[i - 1].startDate as unknown as string,
          userActivities[i].startDate as unknown as string
        )
      ) {
        currentStreak++;
      } else {
        longestStreak = Math.max(currentStreak, longestStreak);
        currentStreak = 1;
      }
    }
    longestStreak = Math.max(currentStreak, longestStreak);
    if (longestStreak > maxStreak) {
      maxStreak = longestStreak;
      grinderUserId = user.userId;
    }
  }

  const grinderUser = users.find((user) => user.userId === grinderUserId);
  return (
    <ShoutoutCard
      user={grinderUser}
      symbol="🗓️"
      label="Daily Grinder"
      metric={maxStreak}
      description="days activity streak"
    />
  );
};

export default Grinder;
