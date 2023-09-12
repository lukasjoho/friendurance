import { Discipline } from '@/lib/data/disciplines';
import { getTeams, getTeamsSummariesByDiscipline } from '@/lib/db';
import { getCookieValue, getDaysFromDateRange } from '@/lib/helpers';
import { FC } from 'react';
import Container from '../Container';
import DataTable from './DataTable';
import { teamColumns } from './leaderboardColumns';

interface TeamsTableProps {
  discipline: Discipline;
}

const TeamsTable: FC<TeamsTableProps> = async ({ discipline }) => {
  const { dbType } = discipline;
  const dateRange = await getCookieValue('dateRange');
  const days = await getDaysFromDateRange(dateRange || 'last-month');
  const teams = await getTeams();
  const teamsData = await getTeamsSummariesByDiscipline(teams, dbType, days);
  // await wait();
  return (
    <Container>
      <div className="rounded-xl border">
        <DataTable data={teamsData} columns={teamColumns} />
      </div>
    </Container>
  );
};

export default TeamsTable;
