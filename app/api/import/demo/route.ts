import { prisma } from '@/lib/clients/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { generateActivities, generateUsers } from './demoData';

export async function POST(req: NextRequest) {
  let request;
  try {
    request = await req.json();
  } catch (error) {
    return NextResponse.json({ error: 'Provide a body.' });
  }
  const { count } = request;
  if (!count) {
    return NextResponse.json({ error: 'Provide a body with count value.' });
  }
  const upsertedUsers = await upsertDemoUsers();
  const createdActivities = await createDemoActivities(parseInt(count));

  return NextResponse.json(createdActivities);
}

const TYPES = ['Run', 'Ride'];

const upsertDemoUsers = async () => {
  const users = generateUsers();
  return await prisma.$transaction(
    users.map((user) => {
      const { teamSlug, ...rest } = user;
      const newUser = {
        ...rest,
        teams: {
          connect: {
            slug: teamSlug,
          },
        },
        currentTeam: {
          connect: {
            slug: teamSlug,
          },
        },
      };
      return prisma.user.upsert({
        where: {
          userId: newUser.userId,
        },
        update: newUser,
        create: newUser,
      });
    })
  );
};

const createDemoActivities = async (count: number) => {
  const activities = generateActivities(count);
  return await prisma.$transaction(
    activities.map((activity) => {
      const { userId, ...rest } = activity;
      return prisma.activity.create({
        data: {
          ...rest,
          user: {
            connect: {
              userId: userId,
            },
          },
        },
      });
    })
  );
};
