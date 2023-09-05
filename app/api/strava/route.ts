import { upsertUser } from "@/lib/service";
import { getTokens, getStravaUser } from "@/lib/strava";
import { setTokens } from "@/lib/tokens";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.nextUrl);
  const code = searchParams.get("code");
  const tokens = await getTokens(code as string);
  const stravaUser = await getStravaUser(tokens.access_token);
  const dbUser = await upsertUser(stravaUser);
  setTokens(tokens.access_token, tokens.refresh_token);
  return NextResponse.redirect(new URL("/", req.url));
}
