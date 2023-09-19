'use server';

import ActionResponse from '@/lib/actions/utils';
import { prisma } from '@/lib/clients/prisma';
import { getAuthUser } from '@/lib/db';

export async function createInvite() {
  const user = await getAuthUser();
  if (!user || !user?.currentTeam) {
    return ActionResponse.error('Invite failed.');
  }
  const { userId, currentTeam } = user;
  const { slug } = currentTeam;
  try {
    const invite = await prisma.invite.create({
      data: {
        team: {
          connect: {
            slug,
          },
        },
        invitedBy: {
          connect: {
            userId,
          },
        },
      },
    });
    return ActionResponse.success('Invite created successfully.', invite);
  } catch (error) {
    return ActionResponse.success('Invite failed.', error);
  }
}
