'use client';
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import TeamInfoModal from '../TeamInfoModal';
import { useModal } from '../shared/modal';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

export interface Stats {
  avgTotalDistance: number;
  avgSpeed: number;
  avgDistancePerRun: number;
  avgActivityCount: number;
}

export interface Data extends Stats {
  entity: any;
}

interface DataTableProps {
  data: Data[];
  columns: ColumnDef<any>[];
  type: 'user' | 'team';
}

const DataTable: FC<DataTableProps> = ({ data, columns, type }) => {
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'avgTotalDistance',
      desc: true,
    },
  ]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });
  const router = useRouter();
  const { show } = useModal();
  return (
    <Table className="w-full whitespace-nowrap">
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
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row, idx) => (
            // <Link href="/user/101854625" style={{ display: 'table-row' }}>
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && 'selected'}
              onClick={() =>
                type === 'user'
                  ? router.push(`/user/${row.original.entity.userId}`)
                  : show(<TeamInfoModal data={row} />)
              }
            >
              <TableCell className="pl-6 text-lg font-medium md:text-xl">
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
            // </Link>
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

export default DataTable;
