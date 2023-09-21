'use server';

import ActionResponse from '@/lib/actions/utils';
import { prisma } from '@/lib/clients/prisma';
import { revalidatePath } from 'next/cache';

export async function refreshUserData(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { userId: id },
      select: { userId: true, firstName: true, refreshToken: true },
    });

    if (!user) throw new Error('User not found');

    if (!user.refreshToken)
      throw new Error('User does not have a refresh token');

    const data = await refreshAccessToken(user.refreshToken);

    if (!data.access_token) throw new Error('No access token returned');

    const importPath = `/api/import/manual?userId=${user.userId}&accessToken=${data.access_token}&page=1&per_page=50`;
    const importPath2 = `/api/import/manual?userId=${user.userId}&accessToken=${data.access_token}&page=2&per_page=50`;
    const res = await fetch(`${process.env.HOST_URL}${importPath}`);
    const res2 = await fetch(`${process.env.HOST_URL}${importPath2}`);
    await prisma.user.update({
      where: { userId: user.userId },
      data: {
        accessToken: data.access_token,
        updatedAt: new Date(),
      },
    });
    revalidatePath('/admin');
    return ActionResponse.success('User data refreshed');
  } catch (error: any) {
    return ActionResponse.error(error.message || 'Refresh failed', error);
  }
}

async function refreshAccessToken(refreshToken: string) {
  const stravaUrl = `https://www.strava.com/oauth/token?client_id=${process.env.STRAVA_CLIENT_ID}&client_secret=${process.env.STRAVA_CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${refreshToken}`;
  const res = await fetch(stravaUrl, {
    method: 'POST',
  });
  const data = await res.json();
  return data;
}
