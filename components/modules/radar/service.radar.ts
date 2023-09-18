'use server';
import ActionResponse from '@/lib/actions/utils';
import { prisma } from '@/lib/clients/prisma';

export async function getRadarMetrics() {
  const userId = '25954785';
  const runMetrics = await getAllMetrics(userId, 'Run');
  const rideMetrics = await getAllMetrics(userId, 'Ride');
  const response = {
    userId,
    metrics: {
      run: runMetrics,
      ride: rideMetrics,
    },
  };
  return ActionResponse.success('', response);
}

function findAthletePosition(groupedMetrics: any[], userId: string) {
  return groupedMetrics.findIndex((user) => user.userId === userId);
}

function getPercentile(groupedMetrics: any[], userId: string) {
  const index = findAthletePosition(groupedMetrics, userId);
  return Math.round(((index + 1) / groupedMetrics.length) * 100);
}

async function getAllMetrics(userId: string, type: 'Run' | 'Ride') {
  const sortedCount = await getSortedCounts(type);
  const sortedSpeed = await getSortedSpeed(type);
  const sortedDistance = await getSortedDistance(type);
  const sortedElevation = await getSortedElevation(type);
  return {
    count: getPercentile(sortedCount, userId),
    speed: getPercentile(sortedSpeed, userId),
    distance: getPercentile(sortedDistance, userId),
    elevation: getPercentile(sortedElevation, userId),
  };
}

interface QueryOptions {
  metric: '_count' | '_avg';
  field: '';
}

export async function getSortedCounts(type: 'Run' | 'Ride') {
  //in last 30 days
  return await prisma.activity.groupBy({
    by: ['userId'],
    where: {
      startDate: {
        gte: new Date(new Date().setDate(new Date().getDate() - 30)),
      },
      type,
    },
    _count: {
      userId: true,
    },
    orderBy: {
      _count: {
        userId: 'asc',
      },
    },
  });
}

export async function getSortedSpeed(type: 'Run' | 'Ride') {
  return await prisma.activity.groupBy({
    by: ['userId'],
    where: {
      startDate: {
        gte: new Date(new Date().setDate(new Date().getDate() - 30)),
      },
      type,
    },
    _avg: {
      averageSpeed: true,
    },
    orderBy: {
      _avg: {
        averageSpeed: 'asc',
      },
    },
  });
}

export async function getSortedDistance(type: 'Run' | 'Ride') {
  return await prisma.activity.groupBy({
    by: ['userId'],
    where: {
      startDate: {
        gte: new Date(new Date().setDate(new Date().getDate() - 30)),
      },
      type,
    },
    _avg: {
      distance: true,
    },
    orderBy: {
      _avg: {
        distance: 'asc',
      },
    },
  });
}

export async function getSortedElevation(type: 'Run' | 'Ride') {
  return await prisma.activity.groupBy({
    by: ['userId'],
    where: {
      startDate: {
        gte: new Date(new Date().setDate(new Date().getDate() - 30)),
      },
      type,
    },
    _avg: {
      elevHigh: true,
    },
    orderBy: {
      _avg: {
        elevHigh: 'asc',
      },
    },
  });
}
