import { prisma } from '@/lib/clients/prisma';

export async function generateStaticParams() {
  const users = await prisma.user.findMany();
  return users.map((user: any) => ({
    id: user.userId,
  }));
}

const UserPage = () => {
  return <div>UserPage</div>;
};

export default UserPage;
