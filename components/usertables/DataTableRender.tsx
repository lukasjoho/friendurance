'use client';
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
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
    accessorKey: 'user',
    header: 'Athlete',
    cell: ({ row }) => {
      const user: any = row.getValue('user');
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
  {
    accessorKey: 'totalDistance',
    header: ({ column }) => {
      return (
        <Button
          variant="superghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="-ml-4"
        >
          Total Distance
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const totalDistance: number = row.getValue('totalDistance');
      return <div>{formatMToKm(totalDistance) + ' km'}</div>;
    },
  },
  {
    accessorKey: 'avgSpeed',
    header: 'Avg. Speed',
    cell: ({ row }) => {
      const avgSpeed: number = row.getValue('avgSpeed');
      return <div>{formatMPerSecondToKmPerHour(avgSpeed) + ' km/h'}</div>;
    },
  },
  {
    accessorKey: 'avgDistance',
    header: 'Avg. Distance / Run',
    cell: ({ row }) => {
      const avgDistance: number = row.getValue('avgDistance');
      return <div>{formatMToKm(avgDistance) + ' km'}</div>;
    },
  },
  {
    accessorKey: 'activityCount',
    header: 'Activity Count',
  },
];

const formatMPerSecondToKmPerHour = (mPerSecond: number) => {
  return (mPerSecond * 3.6).toFixed(2);
};

const formatMToKm = (m: number) => {
  return (m / 1000).toFixed(2);
};

const DataTableRender = ({ data }: any) => {
  const { team, users } = data;
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'totalDistance',
      desc: true,
    },
  ]);
  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });
  return (
    <Table className="w-full">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            <TableHead className="pl-6">Rank</TableHead>
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
        <TableRow className="text-lg font-semibold">
          <TableCell></TableCell>
          <TableCell className="py-2 first:pl-6">Team Averages</TableCell>
          <TableCell className="py-2">
            {formatMToKm(team.avgTotalDistance) + ' km'}
          </TableCell>
          <TableCell className="py-2">
            {formatMPerSecondToKmPerHour(team.avgSpeed) + 'km/h'}
          </TableCell>
          <TableCell className="py-2">
            {formatMToKm(team.avgDistance) + ' km'}
          </TableCell>

          <TableCell className="py-2">
            {team.activityCount.toFixed(2)}
          </TableCell>
        </TableRow>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row, idx) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && 'selected'}
            >
              <TableCell className="pl-6">{idx + 1}</TableCell>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
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

export default DataTableRender;
