import Connect from '@/components/Connect';
import { getAuthUser } from '@/lib/db';

const ConnectPage = async () => {
  const user = await getAuthUser();
  return (
    <div className="flex grow items-center justify-center">
      <Connect user={user} />
    </div>
  );
};

export default ConnectPage;
