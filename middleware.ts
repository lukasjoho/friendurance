import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const cookieToken = req.cookies.get("accesstoken");
}

export const config = {
  matcher: ["/dashboard", "/users"],
};
