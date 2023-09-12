import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Container from './Container';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';

const Gallery = async () => {
  const getActivitiesWithDelay = (): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const activitiesWithPhotos = await prisma.activity.findMany({
            where: {
              photo: {
                not: null,
              },
            },
            orderBy: {
              startDate: 'desc',
            },
          });
          resolve(activitiesWithPhotos);
        } catch (error) {
          reject(error);
        }
      }, 5000);
    });
  };
  //get all activities with photos
  const activitiesWithPhotos = await getActivitiesWithDelay();
  return (
    <Container>
      <Card>
        <CardHeader>
          <CardTitle>Recent photos</CardTitle>
          <CardDescription>First photo of last 10 activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-scroll">
            <div className="flex h-32 w-auto justify-start gap-2">
              {activitiesWithPhotos.map((activity) => {
                return (
                  <Image
                    src={activity.photo!}
                    alt=""
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: 'auto', height: '100%' }}
                    className="shrink-0 overflow-hidden rounded-xl"
                    key={activity.id}
                  />
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Gallery;
