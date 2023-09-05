import { client } from "@/lib/dynamodb";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";
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
  const Item = {
    id: { S: stravaData.id.toString() },
    firstName: { S: stravaData.firstname },
    lastName: { S: stravaData.lastname },
    imageUrl: { S: stravaData.profile },
  };
  const user = await client.send(
    new PutItemCommand({
      TableName: "users",
      Item,
    })
  );
  return NextResponse.json({ user });
}
