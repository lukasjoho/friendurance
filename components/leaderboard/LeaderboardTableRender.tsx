'use client';
import { cn } from '@/lib/utils';
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { TeamAvatar, UserAvatar } from '../UserAvatar';
import TableHeaderButton from '../shared/TableHeaderButton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'team',
    header: 'Team',
    cell: ({ row }) => {
      const team: any = row.getValue('team');
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

const formatMPerSecondToKmPerHour = (mPerSecond: number) => {
  return (mPerSecond * 3.6).toFixed(2);
};

const formatMToKm = (m: number) => {
  return (m / 1000).toFixed(2);
};

const LeaderboardTableRender = ({ data }: any) => {
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'avgTotalDistance',
      desc: true,
    },
  ]);
  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });
  return (
    <Table className="w-full whitespace-nowrap">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            <TableHead>Rank</TableHead>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row, idx) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && 'selected'}
            >
              <TableCell className="text-xl font-medium md:text-3xl">
                {idx + 1}
              </TableCell>
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className="py-4 text-base font-medium md:py-6 md:text-lg"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default LeaderboardTableRender;
