import { fetcher } from "@/lib/fetcher";
import { prisma } from "@/lib/prisma";
import { getStravaUser } from "@/lib/strava";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const cookieStore = cookies();
  // const athleteIdCookie = cookieStore.get("athleteId");
  // const athleteId = athleteIdCookie?.value;
  const accessTokenCookie = cookieStore.get("accessToken");
  const accessToken = accessTokenCookie?.value;
  // if (!athleteId) {
  //   throw new Error("Athlete ID is null or undefined");
  // }
  // if (!accessToken) {
  //   throw new Error("Access token is null or undefined");
  // }

  const stravaUser = await getStravaUser();

  const [userStats, error] = await fetcher(
    `https://www.strava.com/api/v3/athletes/${String(stravaUser.id)}/stats`
  );
  // const athleteStatsRes = await fetch(
  //   `https://www.strava.com/api/v3/athletes/${athleteId}/stats`,
  //   {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   }
  // );
  // const athleteStatsData = await athleteStatsRes.json();

  const newStats = {
    recentRunDistance: userStats.recent_run_totals.distance,
    recentSwimDistance: userStats.recent_swim_totals.distance,
    recentRideDistance: userStats.recent_ride_totals.distance,
    user: { connect: { userId: String(stravaUser.id) } },
  };

  // if (!athleteId) {
  //   throw new Error("athleteId is null or undefined");
  // }
  const upsertedUserStats = await prisma.userStats.upsert({
    where: {
      userId: String(stravaUser.id),
    },
    update: { ...newStats },
    create: {
      ...newStats,
      user: { connect: { userId: String(stravaUser.id) } },
    },
  });

  const [activities, activitiesError] = await fetcher(
    `https://www.strava.com/api/v3/athlete/activities?per_page=100`
  );

  const upsertedActivities = await prisma.$transaction(
    activities.map((activity: any) => {
      const newActivity = {
        activityId: String(activity.id),
        distance: activity.distance,
        movingTime: activity.moving_time,
        type: activity.type,
        startDate: activity.start_date,
        startLatLng: activity.start_latlng,
        user: { connect: { userId: String(stravaUser.id) } },
      };
      return prisma.activity.upsert({
        where: { activityId: String(activity.id) },
        update: newActivity,
        create: newActivity,
      });
    })
  );

  return NextResponse.json({ upsertedActivities, error });
}
