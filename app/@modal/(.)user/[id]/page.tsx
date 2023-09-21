import { getRadarMetrics } from '@/app/api/radars/actions';
import { UserAvatar } from '@/components/UserAvatar';
import Radar from '@/components/modules/radar';
import { RecentActivities } from '@/components/shared/UserInfoModal';
import UserSummary from '@/components/shared/UserSummary';
import {
  ModalContent,
  ModalHeader,
  ModalTitle,
} from '@/components/shared/modal';
import InterceptionModal from '@/components/shared/modal/InterceptionModal';
import { prisma } from '@/lib/clients/prisma';
import { getUserSummary } from '@/lib/db';
import {
  formatFloatMToM,
  formatMPerSecondToKmPerHour,
  formatMToKm,
} from '@/lib/utils';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const users = await prisma.user.findMany();
  return users.map((user: any) => ({
    id: user.userId,
  }));
}

const UserModalPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { id } = params;
  const user = await prisma.user.findUnique({
    where: {
      userId: id,
    },
    include: {
      activities: {
        orderBy: {
          startDate: 'desc',
        },
        take: 5,
      },
    },
  });
  if (!user) {
    notFound();
  }

  const radarMetrics = await getRadarMetrics(user?.userId!);
  return (
    <InterceptionModal>
      <ModalHeader>
        <div className="flex items-center gap-2">
          <UserAvatar className="h-8 w-8" user={user} />
          <ModalTitle>{user?.firstName}</ModalTitle>
        </div>
      </ModalHeader>
      <ModalContent>
        <div className="flex flex-col gap-16 md:flex-row">
          <UserOverview id={user?.userId!} />
          <Radar data={radarMetrics} />
        </div>
        <RecentActivities activities={user?.activities} />
      </ModalContent>
    </InterceptionModal>
  );
};

export default UserModalPage;

const UserSummaryTable = async ({ id, days, discipline }: any) => {
  const userSummary = await getUserSummary({
    id,
    discipline,
    days,
  });
  return (
    <div className="grid grid-cols-2 gap-6">
      <Metric
        label="Total Distance"
        value={formatMToKm(userSummary.avgTotalDistance) + ' km'}
      />
      <Metric
        label="Speed"
        value={formatMPerSecondToKmPerHour(userSummary.avgSpeed) + ' km/h'}
      />
      <Metric
        label="Distance / Run"
        value={formatMToKm(userSummary.avgDistancePerRun) + ' km'}
      />
      <Metric label="Activities" value={userSummary.avgActivityCount} />
      <Metric
        label="Elevation Gain"
        value={formatFloatMToM(userSummary.avgTotalElevGain)}
      />
    </div>
  );
};

const Metric = ({ label, value }: any) => {
  return (
    <div className="w-[128px]">
      <h2 className="text-sm font-medium text-muted-foreground">{label}</h2>
      <h3 className="text-2xl font-medium">{value}</h3>
    </div>
  );
};

const UserOverview = async ({ id }: any) => {
  const views = {
    run: {
      lastMonth: <UserSummaryTable id={id} days={30} discipline="Run" />,
      lastYear: <UserSummaryTable id={id} days={365} discipline="Run" />,
    },
    ride: {
      lastMonth: <UserSummaryTable id={id} days={30} discipline="Ride" />,
      lastYear: <UserSummaryTable id={id} days={365} discipline="Ride" />,
    },
  };
  return <UserSummary views={views} />;
};
