import React from 'react';
import Container from './Container';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { prisma } from '@/lib/prisma';
import { Athlete } from '@/lib/types';
import { formatDate } from '@/lib/helpers';

const UsersTable = async () => {
  const athletes: Athlete[] = await prisma.athlete.findMany({});
  return (
    <Container>
      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Signed up</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {athletes.map((athlete) => {
              return (
                <TableRow>
                  <TableCell className="flex w-64 items-center gap-4 whitespace-nowrap font-medium">
                    <Avatar>
                      <AvatarImage src={athlete.imageUrl ?? undefined} />
                      <AvatarFallback>
                        {athlete.firstName?.charAt(0) +
                          '' +
                          athlete.lastName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {athlete.firstName + ' ' + athlete.lastName}
                  </TableCell>
                  <TableCell>
                    {formatDate(athlete.createdAt.toString())}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </Container>
  );
};

export default UsersTable;
