import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.nextUrl);
  const code = searchParams.get("code");
  const accessTokenUrl = `https://www.strava.com/oauth/token?client_id=${process.env.STRAVA_CLIENT_ID}&client_secret=${process.env.STRAVA_CLIENT_SECRET}&code=${code}&grant_type=authorization_code`;
  const res = await fetch(accessTokenUrl, {
    method: "POST",
  });
  const data = await res.json();
  cookies().set("accesstoken", data.access_token);

  const stravaUser = await fetch(`https://www.strava.com/api/v3/athlete`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${data.access_token}`,
    },
  });
  const stravaData = await stravaUser.json();
  cookies().set("athleteId", data.athlete.id);

  const activitiesRes = await fetch(
    `https://www.strava.com/api/v3/athlete/activities?per_page=100`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${data.access_token}`,
      },
    }
  );
  const activitiesData = await activitiesRes.json();

  const userObj = {
    athleteId: String(stravaData.id),
    firstName: stravaData.firstname,
    lastName: stravaData.lastname,
    imageUrl: stravaData.profile,
  };
  const dbAthlete = await prisma.athlete.upsert({
    where: { athleteId: String(stravaData.id) },
    update: userObj,
    create: userObj,
  });

  const upsertedActivities = await prisma.$transaction(
    activitiesData.map((activity: any) => {
      const newActivity = {
        activityId: String(activity.id),
        distance: activity.distance,
        movingTime: activity.moving_time,
        type: activity.type,
        startDate: activity.start_date,
        startLatLng: activity.start_latlng,
        athlete: { connect: { athleteId: String(activity.athlete.id) } },
      };
      return prisma.activity.upsert({
        where: { activityId: String(activity.id) },
        update: newActivity,
        create: newActivity,
      });
    })
  );

  return NextResponse.json({ upsertedActivities });
}
