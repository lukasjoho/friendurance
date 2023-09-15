import { prisma } from '@/lib/clients/prisma';
import { getAuthUser } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

//create team in database with prisma
export async function POST(req: NextRequest) {
  const { name, slug }: any = await req.json();
  const user = await getAuthUser();
  const dbTeam = await prisma.team.findUnique({
    where: {
      slug: slug,
    },
  });
  if (dbTeam) {
    return NextResponse.json(dbTeam, { status: 409 });
  }
  const team = await prisma.team.create({
    data: {
      name: name,
      slug: slug,
      members: {
        connect: {
          userId: user?.userId,
        },
      },
    },
  });
  return NextResponse.json(team);
}
