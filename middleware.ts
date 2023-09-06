import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const refreshTokenCookie = req.cookies.get('refreshToken');
  const refreshToken = refreshTokenCookie?.value;
  if (!refreshToken) {
    const url = new URL(`/`, req.url);
    url.searchParams.set('callbackUrl', encodeURI(req.url));
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/dashboard', '/users'],
};
