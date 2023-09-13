import { Discipline } from '@/lib/data/disciplines';
import Image from 'next/image';
import { FC } from 'react';

interface LeaderBoardHeroProps {
  discipline: Discipline;
}

const LeaderboardHero: FC<LeaderBoardHeroProps> = ({ discipline }) => {
  const { titlePrefix, imageUrl } = discipline;
  return (
    <div className="relative aspect-[3/1] w-full sm:aspect-[4/1] lg:aspect-[5/1]">
      <Image
        src={imageUrl}
        alt=""
        fill
        objectFit="cover"
        className=" brightness-90"
      />
      <h1 className="font-tungsten xl:text-10xl absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center text-4xl font-semibold text-primary-foreground drop-shadow-lg sm:text-6xl md:text-7xl lg:text-8xl">
        <span className="text-brand">{titlePrefix + ' '}</span>Leaderboard
      </h1>
    </div>
  );
};

export default LeaderboardHero;
