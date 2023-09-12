import { getUsersByTeam, getUsersSummariesByDiscipline } from '@/lib/db';
import { getCookieValue, getDaysFromDateRange } from '@/lib/helpers';
import { FC } from 'react';
import DataTable from './DataTable';
import { userColumns } from './leaderboardColumns';

interface UsersTableProps {
  discipline: 'Run' | 'Ride';
  slug: string;
}

const UsersTable: FC<UsersTableProps> = async ({ discipline, slug }) => {
  const dateRange = await getCookieValue('dateRange');
  const days = await getDaysFromDateRange(dateRange || 'last-month');
  const users = await getUsersByTeam(slug);
  const usersData = await getUsersSummariesByDiscipline(
    users,
    discipline,
    slug,
    days
  );
  return <DataTable data={usersData} columns={userColumns} />;
};

export default UsersTable;
