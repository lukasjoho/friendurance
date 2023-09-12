'use server';

import { prisma } from '../prisma';
import ActionResponse from './utils';

export async function createFeedback(data: any) {
  try {
    await prisma.feedback.create({ data });
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
