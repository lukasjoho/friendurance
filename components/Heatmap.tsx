import { prisma } from '@/lib/prisma';
import HeatmapRender from './HeatmapRender';

const HeatMap = async () => {
  const activities = await prisma.activity.groupBy({
    by: ['startDate'],
    _count: {
      id: true,
    },
    where: {
      type: {
        in: ['Ride', 'Run'],
      },
    },
  });
  const activeUsers = await prisma.activity.groupBy({
    by: ['userId'],
    where: {
      startDate: {
        gte: new Date(new Date().getTime() - 28 * 24 * 60 * 60 * 1000),
      },
      type: {
        in: ['Ride', 'Run'],
      },
    },
  });
  const replacer = (key: string, value: any) => {
    if (typeof value === 'bigint') {
      return Number(value); // convert BigInt to string
    }
    return value;
  };
  const raw =
    await prisma.$queryRaw`SELECT DATE(startDate) AS date, COUNT(*) as count FROM Activity GROUP BY DATE(startDate) ORDER BY DATE(startDate) ASC`;
  //   return <pre>{JSON.stringify(raw, replacer, 2)}</pre>;
  const values = JSON.parse(JSON.stringify(raw, replacer));
  return <HeatmapRender value={values} />;
};

export default HeatMap;
