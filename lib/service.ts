import { prisma } from './clients/prisma';

export async function upsertUser(stravaUser: any) {
  let teamConnect;
  if (stravaUser.teamInvitedSlug) {
    teamConnect = {
      currentTeam: {
        connect: {
          slug: stravaUser.teamInvitedSlug,
        },
      },
      teams: {
        connect: {
          slug: stravaUser.teamInvitedSlug,
        },
      },
    };
  }
  const user = {
    userId: String(stravaUser.id),
    firstName: stravaUser.firstname,
    lastName: stravaUser.lastname,
    imageUrl: stravaUser.profile,
    accessToken: stravaUser.access_token,
    refreshToken: stravaUser.refresh_token,
    ...teamConnect,
  };
  const dbAthlete = await prisma.user.upsert({
    where: { userId: String(stravaUser.id) },
    update: user,
    create: user,
  });
  if (!dbAthlete) throw new Error();
  return dbAthlete;
}
