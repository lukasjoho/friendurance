import { Discipline } from '@/lib/data/disciplines';
import Image from 'next/image';
import { FC } from 'react';

interface LeaderBoardHeroProps {
  discipline: Discipline;
}

const LeaderboardHero: FC<LeaderBoardHeroProps> = ({ discipline }) => {
  const { titlePrefix, imageUrl } = discipline;
  return (
    <div className="relative aspect-[2/1] w-full sm:aspect-[3/1] lg:aspect-[5/1]">
      <Image
        src={imageUrl}
        alt=""
        fill
        objectFit="cover"
        className=" brightness-90"
      />
      <h1 className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center font-tungsten text-5xl font-semibold text-primary-foreground drop-shadow-lg sm:text-7xl md:text-8xl lg:text-9xl xl:text-10xl">
        <span className="text-brand">{titlePrefix + ' '}</span>Leaderboard
      </h1>
    </div>
  );
};

export default LeaderboardHero;
