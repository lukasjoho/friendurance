import {
  getCookieValue,
  getDateFromDays,
  getDaysFromDateRange,
} from '../helpers';

export default async function () {
  const dateRange = await getCookieValue('dateRange');
  const days = await getDaysFromDateRange(dateRange || 'last-month');
  const date = getDateFromDays(days);
  return date;
}
