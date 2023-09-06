import { prisma } from '@/lib/prisma';
import Container from '../Container';
import GoogleMap from './GoogleMap';

const Map = async () => {
  const activities = await prisma.activity.findMany({
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
    <Container>
      <div className="overflow-hidden rounded-xl border">
        <GoogleMap markers={activities} />
      </div>
    </Container>
  );
};

export default Map;
