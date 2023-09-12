import { getAuthUser } from '@/lib/db';
import { redirect } from 'next/navigation';

const TeamPage = async () => {
  const user = await getAuthUser();
  const currentTeamSlug = user?.currentTeam?.slug;
  if (!currentTeamSlug) {
    redirect('/teams');
  }
  redirect(`/team/${currentTeamSlug}`);
};

export default TeamPage;
