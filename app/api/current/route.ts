//update current team of user in db with prisma

import { getAuthUser } from '@/lib/db';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  const { slug, userId }: any = await req.json();
  const updatedUser = await prisma.user.update({
    where: {
      userId: userId,
    },
    data: {
      currentTeam: {
        connect: {
          slug: slug,
        },
      },
    },
    include: {
      currentTeam: true,
    },
  });
  return NextResponse.json(updatedUser);
}

export async function GET(req: NextRequest) {
  // const { slug, userId }: any = await req.json();
  const user = await getAuthUser();
  // const userTeams = await prisma.user.findUnique({
  //   where: {
  //     userId: user?.userId,
  //   },
  //   include: {
  //     teams: true,
  //     currentTeam: true,
  //   },
  // });
  return NextResponse.json(user);
}
