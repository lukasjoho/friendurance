import { prisma } from "./prisma";
import { getStravaUser } from "./strava";

export async function hasActivitiesAndStats() {
  let hasActivitiesAndStats = false;
  const stravaUser = await getStravaUser();
  const user = await prisma.user.findUnique({
    where: {
      userId: String(stravaUser?.id),
      NOT: [
        {
          activities: {
            none: {},
          },
        },
        {
          userStats: {
            is: null,
          },
        },
      ],
    },
    include: {
      userStats: true,
      activities: true,
    },
  });
  return user;
}
