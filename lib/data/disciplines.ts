export type Discipline = {
  slug: string;
  titlePrefix: string;
  dbType: string;
  imageUrl: string;
};

export const disciplines: Discipline[] = [
  {
    slug: 'run',
    titlePrefix: 'Run',
    dbType: 'Run',
    imageUrl: '/leaderboard-run.jpg',
  },
  {
    slug: 'ride',
    titlePrefix: 'Ride',
    dbType: 'Ride',
    imageUrl: '/leaderboard-ride.jpg',
  },
];
