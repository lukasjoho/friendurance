import { prisma } from "@/lib/prisma";
import { Athlete } from "@/lib/types";
import React, { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Container from "./Container";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const UserShowcase = async () => {
  const athletes: Athlete[] = await prisma.athlete.findMany({});

  return (
    <Container>
      <div className="flex flex-start gap-4">
        {athletes.map((athlete) => {
          return <UserItem athlete={athlete} />;
        })}
      </div>
    </Container>
  );
};

export default UserShowcase;

interface UserItemProps {
  athlete: Athlete;
}

const UserItem: FC<UserItemProps> = ({ athlete }) => {
  return (
    <div className="flex flex-col items-center gap-2 p-6 bg-slate-50 rounded-xl">
      <Avatar className="w-20 h-20">
        <AvatarImage src={athlete.imageUrl ?? undefined} />
        <AvatarFallback>
          {athlete.firstName?.charAt(0) + "" + athlete.lastName?.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <span>{athlete.firstName}</span>
    </div>
  );
};
