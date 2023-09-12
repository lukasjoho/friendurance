import { redirect } from 'next/navigation';

const LeaderboardPage = async () => {
  redirect('/leaderboard/run');
};

export default LeaderboardPage;
