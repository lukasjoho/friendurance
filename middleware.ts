import { NextRequest, NextResponse } from 'next/server';
import { dateRanges } from './lib/data/dateRanges';
import { getCookieValue } from './lib/helpers';

export async function middleware(req: NextRequest) {
  let response = NextResponse.next();

  const { pathname } = req.nextUrl;
  const protectedPaths = ['/dashboard'];
  const matchesProtectedPaths = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );
  if (matchesProtectedPaths) {
    const refreshTokenCookie = req.cookies.get('refreshToken');
    const refreshToken = refreshTokenCookie?.value;
    if (!refreshToken) {
      const url = new URL(`/`, req.url);
      url.searchParams.set('callbackUrl', encodeURI(req.url));
      response = NextResponse.redirect(url);
    }
  }
  const dateRange = await getCookieValue('dateRange');

  console.log('DATECOOKIE: ', dateRange);
  if (!dateRange) {
    response.cookies.set('dateRange', 'last-month');
  }
  let allowedDateRanges = dateRanges.map((range) => range.value);
  if (!allowedDateRanges.includes(dateRange as string)) {
    response.cookies.set('dateRange', 'last-month');
  }

  return response;
}
