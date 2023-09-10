import { cookies } from 'next/headers';
import { prisma } from './prisma';
import { getStravaUserSingle } from './strava';

export async function hasActivitiesAndStats() {
  let hasActivitiesAndStats = false;
  const stravaUser = await getStravaUserSingle();
  const user = await prisma.user.findUnique({
    where: {
      userId: String(stravaUser?.id),
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
  return user;
}

export async function getAuthUser() {
  const cookieStore = cookies();
  const refreshTokenCookie = cookieStore.get('refreshToken');
  const refreshToken = refreshTokenCookie?.value;
  if (!refreshToken) {
    return null;
  }
  const dbUser = await prisma.user.findFirst({
    where: {
      refreshToken: refreshToken,
    },
    select: {
      userId: true,
      firstName: true,
      lastName: true,
      imageUrl: true,
      accessToken: true,
      refreshToken: true,
    },
  });
  return dbUser;
}
