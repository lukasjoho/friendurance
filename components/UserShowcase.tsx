import { prisma } from "@/lib/prisma";
import { Athlete, AthleteWithStats } from "@/lib/types";
import React, { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Container from "./Container";
import { Disc } from "lucide-react";

const UserShowcase = async () => {
  const athletes: any = await prisma.athlete.findMany({
    include: {
      athleteStats: true,
    },
  });

  return (
    <Container>
      <div className="flex flex-start gap-4">
        {athletes.map((athlete: any) => {
          return <UserItem athlete={athlete} />;
        })}
      </div>
      {/* <pre>{JSON.stringify(athletes, null, 2)}</pre> */}
    </Container>
  );
};

export default UserShowcase;

interface UserItemProps {
  athlete: AthleteWithStats;
}

const UserItem: FC<UserItemProps> = ({ athlete }) => {
  return (
    <div className="flex flex-col items-center gap-2 p-6 rounded-xl border">
      <Avatar className="w-20 h-20">
        <AvatarImage src={athlete.imageUrl ?? undefined} />
        <AvatarFallback>
          {athlete.firstName?.charAt(0) + "" + athlete.lastName?.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <span className="font-medium">{athlete.firstName}</span>
      <div>
        <Discipline
          emoji="🏃"
          text={metersToKilometers(athlete.athleteStats?.totalRunDistance)}
        />
        <Discipline
          emoji="🚴"
          text={metersToKilometers(athlete.athleteStats?.totalRideDistance)}
        />
        <Discipline
          emoji="🏊"
          text={metersToKilometers(athlete.athleteStats?.totalSwimDistance)}
        />
      </div>
    </div>
  );
};

interface DisciplineProps {
  emoji: string;
  text?: string | number;
}

const Discipline: FC<DisciplineProps> = ({ emoji, text }) => {
  return (
    <div className="flex items-center gap-1 justify-center">
      <div>{emoji}</div>
      <p>{text}km</p>
    </div>
  );
};

function metersToKilometers(meters: any) {
  return (meters / 1000).toFixed(2);
}
