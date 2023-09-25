import Container from '@/components/layout/Container';
import Connect from '@/components/pages/connect/Connect';
import { getAuthUser } from '@/lib/db';

const ConnectPage = async () => {
  const user = await getAuthUser();
  return (
    <div className="flex grow items-center justify-center py-8 md:py-16">
      <Container className="flex justify-center">
        <Connect user={user} />
      </Container>
    </div>
  );
};

export default ConnectPage;
