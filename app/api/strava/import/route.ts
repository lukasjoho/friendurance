import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const athleteId = cookieStore.get("athleteId");
  const accesstoken = cookieStore.get("accesstoken");
  const athleteStatsRes = await fetch(
    `https://www.strava.com/api/v3/athletes/${athleteId?.value}/stats`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accesstoken?.value}`,
      },
    }
  );
  const athleteStatsData = await athleteStatsRes.json();

  const newStats = {
    totalRunDistance: athleteStatsData.all_run_totals.distance,
    totalSwimDistance: athleteStatsData.all_swim_totals.distance,
    totalRideDistance: athleteStatsData.all_ride_totals.distance,
    athlete: { connect: { athleteId: String(athleteId?.value) } },
  };

  if (!athleteId?.value) {
    throw new Error("athleteId is null or undefined");
  }
  const upsertedAthleteStats = await prisma.athleteStats.upsert({
    where: {
      athleteId: String(athleteId?.value),
    },
    update: { ...newStats },
    create: {
      ...newStats,
      athlete: { connect: { athleteId: String(athleteId?.value) } },
    },
  });

  //   const activitiesRes = await fetch(
  //     `https://www.strava.com/api/v3/athlete/activities?per_page=100`,
  //     {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${accesstoken?.value}`,
  //       },
  //     }
  //   );
  //   const activitiesData = await activitiesRes.json();

  //   const upsertedActivities = await prisma.$transaction(
  //     activitiesData.map((activity: any) => {
  //       const newActivity = {
  //         activityId: String(activity.id),
  //         distance: activity.distance,
  //         movingTime: activity.moving_time,
  //         type: activity.type,
  //         startDate: activity.start_date,
  //         startLatLng: activity.start_latlng,
  //         athlete: { connect: { athleteId: String(activity.athlete.id) } },
  //       };
  //       return prisma.activity.upsert({
  //         where: { activityId: String(activity.id) },
  //         update: newActivity,
  //         create: newActivity,
  //       });
  //     })
  //   );

  return NextResponse.json(upsertedAthleteStats);
}
