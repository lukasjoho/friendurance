import Container from '@/components/layout/Container';
import { UserAvatar } from '@/components/shared/UserAvatar';
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
import RefreshButton from '../../components/pages/admin/RefreshButton';

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
                    {formatDate(user.activities[0]?.startDate?.toISOString()!)}
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
