import { prisma } from '@/lib/clients/prisma';
import { ModuleProps } from '@/lib/types';
import GoogleMap from './GoogleMap';

interface MapProps extends ModuleProps {}

const Map = async ({ slug }: MapProps) => {
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
