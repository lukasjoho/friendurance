import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  //distance of all activities in last 4 weeks
  const run = await prisma.activity.aggregate({
    _avg: {
      distance: true,
    },
    _sum: {
      distance: true,
    },
    where: {
      startDate: {
        gte: new Date(new Date().getTime() - 28 * 24 * 60 * 60 * 1000),
      },
      type: {
        equals: 'Run',
      },
    },
  });
  const bike = await prisma.activity.aggregate({
    _avg: {
      distance: true,
    },
    _sum: {
      distance: true,
    },
    where: {
      startDate: {
        gte: new Date(new Date().getTime() - 28 * 24 * 60 * 60 * 1000),
      },
      type: {
        equals: 'Ride',
      },
    },
  });
  return NextResponse.json({ run, bike });
}
