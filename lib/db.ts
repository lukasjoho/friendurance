import { getRadarMetrics } from '@/app/api/radars/actions';
import { cookies } from 'next/headers';
import { prisma } from './clients/prisma';
import { getDateFromDays } from './helpers';
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
      ],
    },
    include: {
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
      currentTeam: true,
      hasConnected: true,
      teams: true,
    },
  });

  if (!dbUser) {
    return null;
  }

  return dbUser;
}
export async function getTeams() {
  const teams: any[] = await prisma.team.findMany({
    include: {
      members: {
        select: {
          userId: true,
          firstName: true,
          lastName: true,
          imageUrl: true,
        },
      },
    },
  });
  return teams;
}

export async function getUsersByTeam(slug: string) {
  const users: any[] = await prisma.user.findMany({
    where: {
      teams: {
        some: {
          slug: slug,
        },
      },
    },
    include: {
      activities: {
        orderBy: {
          startDate: 'desc',
        },
        take: 5,
      },
    },
  });
  return users;
}

export async function getTeamsSummariesByDiscipline(
  teams: any,
  discipline: string,
  days?: number
) {
  const teamsData = await Promise.all(
    teams.map(
      async (team: any) =>
        await getTeamSummaryByDiscipline(team, discipline, days)
    )
  );
  return teamsData;
}

export async function getUsersSummariesByDiscipline(
  users: any,
  discipline: string,
  slug: string,
  days?: number
) {
  const usersData = await Promise.all(
    users.map(
      async (user: any) =>
        await getAthleteSummaryByDiscipline(user, discipline, slug, days)
    )
  );
  return usersData;
}

export async function getUserSummary({
  id,
  discipline,
  days,
}: {
  id: string;
  discipline: string;
  days: number;
}) {
  console.log('SUMMARY SERVER DAYS: ', days);
  const activityDataGroupedByUser = await prisma.activity.aggregate({
    where: {
      user: {
        userId: id,
      },
      type: {
        equals: discipline,
      },
      startDate: {
        gte: getDateFromDays(days),
      },
    },
    _sum: {
      distance: true,
      movingTime: true,
    },
    _avg: {
      distance: true,
      movingTime: true,
      averageSpeed: true,
    },
    _count: {
      activityId: true,
    },
  });
  const userStats = {
    avgTotalDistance: activityDataGroupedByUser._sum.distance || 0,
    avgSpeed: activityDataGroupedByUser._avg.averageSpeed || 0,
    avgDistancePerRun: activityDataGroupedByUser._avg.distance || 0,
    avgActivityCount: activityDataGroupedByUser._count.activityId || 0,
  };

  console.log('NEW STATS: ', userStats);
  return userStats;
}

export async function getAthleteSummaryByDiscipline(
  user: any,
  discipline: string,
  slug: string,
  days: number = 365000
) {
  const activityDataGroupedByUser = await prisma.activity.aggregate({
    where: {
      user: {
        userId: user.userId,
      },
      type: {
        equals: discipline,
      },
      startDate: {
        gte: getDateFromDays(days),
      },
    },
    _sum: {
      distance: true,
      movingTime: true,
    },
    _avg: {
      distance: true,
      movingTime: true,
      averageSpeed: true,
    },
    _count: {
      activityId: true,
    },
  });
  console.log('ACT: ', activityDataGroupedByUser);
  const userStats = {
    avgTotalDistance: activityDataGroupedByUser._sum.distance || 0,
    avgSpeed: activityDataGroupedByUser._avg.averageSpeed || 0,
    avgDistancePerRun: activityDataGroupedByUser._avg.distance || 0,
    avgActivityCount: activityDataGroupedByUser._count.activityId || 0,
  };
  const metrics = await getRadarMetrics(user.userId);
  return {
    entity: {
      userId: user.userId,
      activities: user.activities,
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
      ...metrics,
    },
    ...userStats,
  };
}

export async function getTeamSummaryByDiscipline(
  team: any,
  discipline: string,
  days: number = 365000
) {
  const activityDataGroupedByTeam = await prisma.activity.aggregate({
    where: {
      user: {
        teams: {
          some: {
            id: team.id,
          },
        },
      },
      type: {
        equals: discipline,
      },
      startDate: {
        gte: getDateFromDays(days),
      },
    },
    _sum: {
      distance: true,
    },
    _avg: {
      distance: true,
      movingTime: true,
      averageSpeed: true,
    },
    _count: {
      activityId: true,
    },
  });
  const teamStats = {
    avgTotalDistance:
      activityDataGroupedByTeam._sum.distance! / team.members.length || 0,
    avgSpeed: activityDataGroupedByTeam._avg.averageSpeed || 0,
    avgDistancePerRun: activityDataGroupedByTeam._avg.distance || 0,
    avgActivityCount:
      activityDataGroupedByTeam._count.activityId / team.members.length || 0,
  };
  return {
    entity: {
      id: team.id,
      name: team.name,
      imageUrl: team.imageUrl,
      members: team.members,
    },
    ...teamStats,
  };
}
