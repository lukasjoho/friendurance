import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const athleteIdCookie = cookieStore.get("athleteId");
  const athleteId = athleteIdCookie?.value;
  const accessTokenCookie = cookieStore.get("accesstoken");
  const accessToken = accessTokenCookie?.value;
  if (!athleteId) {
    throw new Error("Athlete ID is null or undefined");
  }
  if (!accessToken) {
    throw new Error("Access token is null or undefined");
  }
  const athleteStatsRes = await fetch(
    `https://www.strava.com/api/v3/athletes/${athleteId}/stats`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const athleteStatsData = await athleteStatsRes.json();

  const newStats = {
    totalRunDistance: athleteStatsData.all_run_totals.distance,
    totalSwimDistance: athleteStatsData.all_swim_totals.distance,
    totalRideDistance: athleteStatsData.all_ride_totals.distance,
    athlete: { connect: { athleteId: String(athleteId) } },
  };

  if (!athleteId) {
    throw new Error("athleteId is null or undefined");
  }
  const upsertedAthleteStats = await prisma.athleteStats.upsert({
    where: {
      athleteId: athleteId,
    },
    update: { ...newStats },
    create: {
      ...newStats,
      athlete: { connect: { athleteId: athleteId } },
    },
  });

  const activitiesRes = await fetch(
    `https://www.strava.com/api/v3/athlete/activities?per_page=100`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const activitiesData = await activitiesRes.json();

  const upsertedActivities = await prisma.$transaction(
    activitiesData.map((activity: any) => {
      const newActivity = {
        activityId: String(activity.id),
        distance: activity.distance,
        movingTime: activity.moving_time,
        type: activity.type,
        startDate: activity.start_date,
        startLatLng: activity.start_latlng,
        athlete: { connect: { athleteId: String(athleteId) } },
      };
      return prisma.activity.upsert({
        where: { activityId: String(activity.id) },
        update: newActivity,
        create: newActivity,
      });
    })
  );

  return NextResponse.json(upsertedActivities);
}
