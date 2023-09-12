import Container from '@/components/Container';
import DisciplineSelector, {
  DateRangeSelector,
} from '@/components/DisciplineSelector';
import LeaderboardHero from '@/components/leaderboard/LeaderboardHero';
import LeaderboardTable from '@/components/leaderboard/LeaderboardTable';
import SkeletonLeaderboardTable from '@/components/leaderboard/SkeletonLeaderboardTable';
import { Discipline, disciplines } from '@/lib/data/disciplines';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export async function generateStaticParams() {
  return disciplines.map((discipline: Discipline) => ({
    slug: discipline.slug,
  }));
}

const LeaderboardTypePage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const discipline = disciplines.find((discipline) => discipline.slug === slug);
  if (!discipline) {
    notFound();
  }
  return (
    <div className="grow space-y-4">
      <LeaderboardHero discipline={discipline} />
      <Container className="flex justify-between">
        <DisciplineSelector discipline={discipline} />
        <DateRangeSelector />
      </Container>
      <Suspense fallback={<SkeletonLeaderboardTable />}>
        <LeaderboardTable discipline={discipline} />
      </Suspense>
    </div>
  );
};

export default LeaderboardTypePage;
