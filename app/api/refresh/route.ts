import { refreshTokens } from "@/lib/strava";
import { setTokens } from "@/lib/tokens";
import { cookies } from "next/headers";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const accessTokenCookie = cookies().get("accessToken");
  console.log("COOKIES REFRESHED:", req.headers.get("set-cookie"));

  const cookieStore = cookies();
  const refreshTokenCookie = cookieStore.get("refreshToken");
  const currentRefreshToken = refreshTokenCookie?.value;
  const grantType = "refresh_token";
  const tokenUrl = `https://www.strava.com/oauth/token?client_id=${process.env.STRAVA_CLIENT_ID}&client_secret=${process.env.STRAVA_CLIENT_SECRET}&grant_type=${grantType}&refresh_token=${currentRefreshToken}`;

  const res = await fetch(tokenUrl, {
    method: "POST",
  });
  const data = await res.json();
  const { access_token: accessToken, refresh_token: refreshToken } = data;
  setTokens(accessToken, refreshToken);

  return NextResponse.json({ accessToken, refreshToken });
}
