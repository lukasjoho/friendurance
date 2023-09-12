import { cookies } from 'next/headers';
import { getDateFromDays } from './helpers';
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

export async function getUsers() {
  const users: any[] = await prisma.user.findMany({});
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
  days?: number
) {
  const usersData = await Promise.all(
    users.map(
      async (user: any) =>
        await getAthleteSummaryByDiscipline(user, discipline, days)
    )
  );
  return usersData;
}

export async function getAthleteSummaryByDiscipline(
  user: any,
  discipline: string,
  days: number = 365000
) {
  const activityDataGroupedByUser = await prisma.activity.aggregate({
    where: {
      userId: user.userId,
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
    },
    _count: {
      id: true,
    },
  });
  const userStats = {
    avgTotalDistance: activityDataGroupedByUser._sum.distance || 0,
    avgSpeed:
      activityDataGroupedByUser._avg.distance! /
        activityDataGroupedByUser._avg.movingTime! || 0,
    avgDistancePerRun: activityDataGroupedByUser._avg.distance || 0,
    avgActivityCount: activityDataGroupedByUser._count.id || 0,
  };
  return {
    entity: {
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
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
    },
    _count: {
      id: true,
    },
  });
  const teamStats = {
    avgTotalDistance:
      activityDataGroupedByTeam._sum.distance! / team.members.length || 0,
    avgSpeed:
      activityDataGroupedByTeam._avg.distance! /
        activityDataGroupedByTeam._avg.movingTime! || 0,
    avgDistancePerRun: activityDataGroupedByTeam._avg.distance || 0,
    avgActivityCount:
      activityDataGroupedByTeam._count.id / team.members.length || 0,
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
