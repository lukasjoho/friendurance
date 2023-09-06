import React from 'react';
import GoogleMap from './GoogleMap';
import { prisma } from '@/lib/prisma';
import { act } from 'react-dom/test-utils';
import Container from '../Container';

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
