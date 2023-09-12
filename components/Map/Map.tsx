import { prisma } from '@/lib/prisma';
import GoogleMap from './GoogleMap';

const Map = async ({ slug }: { slug: string }) => {
  const activities = await prisma.activity.findMany({
    where: {
      user: {
        teams: {
          some: {
            slug,
          },
        },
      },
    },
    select: {
      startLatLng: true,
      user: {
        select: {
          imageUrl: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });
  return (
    <div className="overflow-hidden rounded-xl border">
      <GoogleMap markers={activities} />
    </div>
  );
};

export default Map;
