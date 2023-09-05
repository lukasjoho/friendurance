import { prisma } from "./prisma";

export async function upsertUser(stravaUser: any) {
  const user = {
    userId: String(stravaUser.id),
    firstName: stravaUser.firstname,
    lastName: stravaUser.lastname,
    imageUrl: stravaUser.profile,
  };
  const dbAthlete = await prisma.user.upsert({
    where: { userId: String(stravaUser.id) },
    update: user,
    create: user,
  });
  if (!dbAthlete) throw new Error();
  return dbAthlete;
}
