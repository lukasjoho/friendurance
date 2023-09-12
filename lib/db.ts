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
  const teams = await prisma.team.findMany({
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

export async function getTeamSummaryByDiscipline(
  team: any,
  discipline: string,
  days: number = 365000
) {
  const activityDataGroupedByTeam = await prisma.activity.aggregate({
    where: {
      user: {
        teamId: team.id,
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
  const teamData = {
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
    team: {
      id: team.id,
      name: team.name,
      imageUrl: team.imageUrl,
      members: team.members,
    },
    ...teamData,
  };
}
