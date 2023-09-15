'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { prisma } from '../clients/prisma';
import { getAuthUser } from '../db';
import ActionResponse from './utils';

export async function getUserTeams() {
  const user = await getAuthUser();
  return ActionResponse.success('', user);
}

export async function setCurrentTeam(userId: string, slug: string) {
  try {
    await prisma.user.update({
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
    });
    return ActionResponse.success('Successfully updated current team.');
  } catch (error) {
    return ActionResponse.error('Failed to set current team.');
  }
}

export async function setHasConnected(userId: string) {
  try {
    await prisma.user.update({
      where: {
        userId: userId,
      },
      data: {
        hasConnected: true,
      },
    });
    return ActionResponse.success('User updated.');
  } catch (error: unknown) {
    return ActionResponse.error('Failed to update user.');
  }
}

export async function createFeedback(data: any) {
  try {
    await prisma.feedback.create({ data });
    revalidatePath('/feedback');
    return {
      success: true,
      message: 'Feedback created.',
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: 'Failed to create feedback.',
    };
  }
}

export async function createTeam(data: any) {
  try {
    const dbTeam = await prisma.team.findUnique({
      where: {
        slug: data.slug,
      },
    });
    if (dbTeam) {
      return ActionResponse.error('Team name not available.');
    }
    const team = await prisma.team.create({
      data: {
        name: data.name,
        slug: data.slug,
      },
    });
    return ActionResponse.success('Team created successfully.', team);
  } catch (error) {
    return ActionResponse.error('Failed to create team.');
  }
}

export async function createVote(feedbackId: string) {
  const anonymousId = cookies().get('anonymousId');
  const dbVote = await prisma.vote.findUnique({
    where: {
      feedbackId_anonymousId: {
        feedbackId,
        anonymousId: anonymousId?.value || '',
      },
    },
  });
  if (dbVote) {
    await prisma.vote.delete({
      where: {
        feedbackId_anonymousId: {
          feedbackId,
          anonymousId: anonymousId?.value || '',
        },
      },
    });
    revalidatePath('/feedback');
    return;
  }
  await prisma.vote.create({
    data: {
      feedback: { connect: { id: feedbackId } },
      anonymousId: anonymousId?.value,
    },
  });
  revalidatePath('/feedback');
  return;
}
