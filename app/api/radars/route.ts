import { NextResponse } from 'next/server';
import {
  getSortedCounts,
  getSortedDistance,
  getSortedElevation,
  getSortedSpeed,
} from './actions';

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

export async function GET() {
  const userId = '101854625';
  const runMetrics = await getAllMetrics(userId, 'Run');
  const rideMetrics = await getAllMetrics(userId, 'Ride');
  const response = {
    userId,
    metrics: {
      run: runMetrics,
      ride: rideMetrics,
    },
  };
  return NextResponse.json(response);
}
