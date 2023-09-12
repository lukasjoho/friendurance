import { prisma } from '@/lib/prisma';
import { FC } from 'react';
import DataTableRender from './DataTableRender';

interface DataTableProps {
  type: 'Run' | 'Ride';
}

const DataTable: FC<DataTableProps> = async ({ type }) => {
  const users = await prisma.user.findMany({
    include: {
      userStats: true,
    },
  });
  //within last 28 days
  const activityDataGroupedByUserId = await prisma.activity.groupBy({
    by: ['userId'],
    where: {
      type: {
        equals: type,
      },
      startDate: {
        gte: new Date(new Date().getTime() - 28 * 24 * 60 * 60 * 1000),
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

  const usersData = await Promise.all(
    activityDataGroupedByUserId.map(async (user) => {
      const dbUser = await prisma.user.findUnique({
        where: {
          userId: user.userId,
        },
        select: {
          userId: true,
          firstName: true,
          lastName: true,
          imageUrl: true,
        },
      });
      const userStats = {
        totalDistance: user._sum.distance,
        avgDistance: user._avg.distance,
        avgSpeed: user._avg.distance! / user._avg.movingTime! || 0,
        activityCount: user._count.id,
      };
      return {
        user: dbUser,
        ...userStats,
      };
    })
  );

  const activityDataGroupedByTeam = await prisma.activity.aggregate({
    where: {
      type: {
        equals: type,
      },
      startDate: {
        gte: new Date(new Date().getTime() - 28 * 24 * 60 * 60 * 1000),
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
      activityDataGroupedByTeam._sum.distance! / usersData.length || 0,
    avgDistance: activityDataGroupedByTeam._avg.distance,
    avgSpeed:
      activityDataGroupedByTeam._avg.distance! /
        activityDataGroupedByTeam._avg.movingTime! || 0,
    activityCount: activityDataGroupedByTeam._count.id / usersData.length || 0,
  };

  const data = {
    team: teamData,
    users: usersData,
  };

  return <DataTableRender data={data} />;
  // return (
  //   <div>
  //     <pre>{JSON.stringify(userData, null, 2)}</pre>
  //   </div>
  // );
};

export default DataTable;
