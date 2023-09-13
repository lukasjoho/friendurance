import { NextRequest, NextResponse } from 'next/server';
import { dateRanges } from './lib/data/dateRanges';
import { getCookieValue } from './lib/helpers';

export async function middleware(req: NextRequest) {
  let response = NextResponse.next();

  const dateRange = await getCookieValue('dateRange');

  if (!dateRange) {
    response.cookies.set('dateRange', 'last-month');
  }
  let allowedDateRanges = dateRanges.map((range) => range.value);
  if (!allowedDateRanges.includes(dateRange as string)) {
    response.cookies.set('dateRange', 'last-month');
  }

  return response;
}
