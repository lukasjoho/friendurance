'use client';
import { cn, formatMPerSecondToKmPerHour, formatMToKm } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { TeamAvatar, UserAvatar } from '../UserAvatar';
import TableHeaderButton from '../shared/TableHeaderButton';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Stats } from './DataTable';

const coreColumns: ColumnDef<Stats>[] = [
  {
    accessorKey: 'avgTotalDistance',
    header: ({ column }) => {
      return (
        <TableHeaderButton column={column}>
          Total Distance / Member
        </TableHeaderButton>
      );
    },
    cell: ({ row }) => {
      const totalDistance: number = row.getValue('avgTotalDistance');
      return <div>{formatMToKm(totalDistance) + ' km'}</div>;
    },
  },
  {
    accessorKey: 'avgSpeed',
    header: ({ column }) => {
      return <TableHeaderButton column={column}>Avg. Pace</TableHeaderButton>;
    },
    cell: ({ row }) => {
      const avgSpeed: number = row.getValue('avgSpeed');
      return <div>{formatMPerSecondToKmPerHour(avgSpeed) + ' km/h'}</div>;
    },
  },
  {
    accessorKey: 'avgDistancePerRun',
    header: ({ column }) => {
      return (
        <TableHeaderButton column={column}>Avg. Run Distance</TableHeaderButton>
      );
    },
    cell: ({ row }) => {
      const avgDistance: number = row.getValue('avgDistancePerRun');
      return <div>{formatMToKm(avgDistance) + ' km'}</div>;
    },
  },
  {
    accessorKey: 'avgActivityCount',
    header: ({ column }) => {
      return (
        <TableHeaderButton column={column}>Runs / Member</TableHeaderButton>
      );
    },
  },
];

export const userColumns: ColumnDef<any>[] = [
  {
    accessorKey: 'entity',
    header: 'Athlete',
    cell: ({ row }) => {
      const user: any = row.getValue('entity');
      return (
        <div className="flex items-center gap-2 font-medium">
          <Avatar className="relative h-8 w-8 ">
            <AvatarImage src={user?.imageUrl || undefined} />

            <AvatarFallback>
              {user?.firstName?.charAt(0) + '' + user?.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>{user?.firstName}</div>
        </div>
      );
    },
  },
  ...coreColumns,
];

export const teamColumns: ColumnDef<any>[] = [
  {
    accessorKey: 'entity',
    header: 'Team',
    cell: ({ row }) => {
      const team: any = row.getValue('entity');
      return (
        <div className="flex items-center gap-2 font-medium md:gap-4">
          <TeamAvatar
            team={team}
            className="h-10 w-10 text-lg md:h-16 md:w-16"
          />
          <div className="md:space-y-1">
            <div className="text-base font-medium md:text-lg">{team?.name}</div>
            <div className="flex">
              {team.members.map((member: any, idx: number) => (
                <UserAvatar
                  key={member.id}
                  user={member}
                  className={cn(
                    'box-content h-4 w-4 border-2 border-white text-xs md:h-6 md:w-6'
                  )}
                  style={{
                    marginLeft: idx === 0 ? 0 : '-8px',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      );
    },
  },
  ...coreColumns,
];
