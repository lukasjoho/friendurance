import { Discipline } from '@/lib/data/disciplines';
import { getTeams, getTeamsSummariesByDiscipline } from '@/lib/db';
import { getCookieValue, getDaysFromDateRange } from '@/lib/helpers';
import { FC } from 'react';
import Container from '../Container';
import LeaderboardTableRender from './LeaderboardTableRender';

interface LeaderboardTableProps {
  discipline: Discipline;
}

const LeaderboardTable: FC<LeaderboardTableProps> = async ({ discipline }) => {
  const { dbType } = discipline;
  const dateRange = await getCookieValue('dateRange');
  const days = await getDaysFromDateRange(dateRange || 'last-month');
  const teams = await getTeams();
  const teamsData = await getTeamsSummariesByDiscipline(teams, dbType, days);
  // await wait();
  return (
    <Container>
      <div className="rounded-xl border">
        <LeaderboardTableRender data={teamsData} />
      </div>
    </Container>
  );
};

export default LeaderboardTable;
