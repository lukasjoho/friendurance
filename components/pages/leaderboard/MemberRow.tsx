'use client';
import { useRouter } from 'next/navigation';
import { UserAvatar } from '../../shared/UserAvatar';
import { TableCell, TableRow } from '../../ui/table';

const MemberRow = ({ member }: any) => {
  const router = useRouter();
  return (
    <TableRow
      onClick={() => router.push(`/user/${member.userId}`)}
      className="cursor-pointer"
    >
      <TableCell className="flex items-center gap-4">
        <UserAvatar className="h-16 w-16" user={member} />
        <div className=" text-2xl font-medium">{member.firstName}</div>
      </TableCell>
    </TableRow>
  );
};

export default MemberRow;
