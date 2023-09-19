import InterceptionModal from '@/components/shared/modal/InterceptionModal';
import { prisma } from '@/lib/clients/prisma';

const UserModalPage = async () => {
  const user = await prisma.user.findUnique({
    where: {
      userId: '101854625',
    },
  });
  return <InterceptionModal />;
};

export default UserModalPage;
