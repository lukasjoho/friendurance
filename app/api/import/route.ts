import { fetcher } from "@/lib/fetcher";
import { prisma } from "@/lib/prisma";
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

  const [userStats, error] = await fetcher(
    `https://www.strava.com/api/v3/athletes/101854625/stats`
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

  // const newStats = {
  //   totalRunDistance: athleteStatsData.all_run_totals.distance,
  //   totalSwimDistance: athleteStatsData.all_swim_totals.distance,
  //   totalRideDistance: athleteStatsData.all_ride_totals.distance,
  //   athlete: { connect: { athleteId: String(athleteId) } },
  // };

  // if (!athleteId) {
  //   throw new Error("athleteId is null or undefined");
  // }
  // const upsertedAthleteStats = await prisma.userStats.upsert({
  //   where: {
  //     userId: athleteId,
  //   },
  //   update: { ...newStats },
  //   create: {
  //     ...newStats,
  //     user: { connect: { userId: athleteId } },
  //   },
  // });

  // const activitiesRes = await fetch(
  //   `https://www.strava.com/api/v3/athlete/activities?per_page=100`,
  //   {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   }
  // );
  // const activitiesData = await activitiesRes.json();

  // const upsertedActivities = await prisma.$transaction(
  //   activitiesData.map((activity: any) => {
  //     const newActivity = {
  //       activityId: String(activity.id),
  //       distance: activity.distance,
  //       movingTime: activity.moving_time,
  //       type: activity.type,
  //       startDate: activity.start_date,
  //       startLatLng: activity.start_latlng,
  //       user: { connect: { userId: String(athleteId) } },
  //     };
  //     return prisma.activity.upsert({
  //       where: { activityId: String(activity.id) },
  //       update: newActivity,
  //       create: newActivity,
  //     });
  //   })
  // );

  return NextResponse.json({ userStats, error });
}
