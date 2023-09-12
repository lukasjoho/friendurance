import { getAuthUser } from '@/lib/db';

const TeamPage = async () => {
  const user = await getAuthUser();
  return <div>{JSON.stringify(user, null, 2)}</div>;
};

export default TeamPage;
