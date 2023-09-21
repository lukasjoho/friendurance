import Container from '@/components/Container';
import { UserAvatar } from '@/components/UserAvatar';
import RefreshButton from '@/components/admin/RefreshButton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { prisma } from '@/lib/clients/prisma';
import { formatDate } from '@/lib/utils';

function handleRefresh(event: React.MouseEvent<HTMLButtonElement>) {
  const id = (event.target as HTMLButtonElement).id;
  console.log(id);
}

const AdminPage = async () => {
  const users = await prisma.user.findMany({
    where: {
      isDemo: false,
    },
    include: {
      activities: {
        orderBy: {
          startDate: 'desc',
        },
        take: 1,
      },
    },
  });
  return (
    <div className="py-8 md:py-16">
      <Container>
        <div className="rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Last Refreshed</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.userId}>
                  <TableCell>
                    <div className="flex items-center gap-2 font-medium">
                      <UserAvatar user={user} />
                      {user.firstName}
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(user.updatedAt.toString())}</TableCell>
                  <TableCell>
                    {formatDate(user.activities[0].startDate?.toISOString()!)}
                  </TableCell>
                  <TableCell className="w-[160px]">
                    <RefreshButton id={user.userId} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Container>
    </div>
  );
};

export default AdminPage;
