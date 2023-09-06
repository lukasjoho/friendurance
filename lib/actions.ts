'use server';

import { prisma } from './prisma';

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
