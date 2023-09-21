import Container from '@/components/Container';
import { Button } from '@/components/ui/button';
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

const AdminPage = async () => {
  const users = await prisma.user.findMany({
    where: {
      isDemo: false,
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
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.userId}>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{formatDate(user.updatedAt.toString())}</TableCell>
                  <TableCell>
                    <Button size="md" variant="default">
                      Refresh
                    </Button>
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
