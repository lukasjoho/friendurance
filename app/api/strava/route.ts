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
  return NextResponse.json({ data });
}
