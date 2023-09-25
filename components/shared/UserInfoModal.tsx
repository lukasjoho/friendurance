'use client';
import {
  formatDate,
  formatMPerSecondToKmPerHour,
  formatMToKm,
  formatToEmoji,
  secondsToHoursMinutes,
} from '@/lib/utils';
import Radar from '../modules/radar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { UserAvatar } from './UserAvatar';
import { Modal, ModalContent, ModalHeader, ModalTitle } from './modal';

interface UserInfoModalProps {
  data: any;
  radar: React.ReactNode;
}

const UserInfoModal = ({ data, radar }: UserInfoModalProps) => {
  const { entity } = data.original;
  return (
    <Modal>
      <ModalHeader>
        <ModalTitle>{entity.firstName}</ModalTitle>
      </ModalHeader>
      <ModalContent>
        <div className="grid grid-cols-2 items-start">
          <User data={entity} />

          <div className="max-w-[400px]">
            <Radar metrics={entity.metrics} />
          </div>
        </div>
        <RecentActivities activities={entity.activities} />
      </ModalContent>
    </Modal>
  );
};

export default UserInfoModal;

const User = ({ data }: any) => {
  const user = {
    firstName: data.firstName,
    lastName: data.lastName,
    imageUrl: data.imageUrl,
  };
  return (
    <div className="flex w-full justify-center">
      <UserAvatar className="h-auto w-1/2" user={user} />
    </div>
  );
};

export const RecentActivities = ({ activities }: any) => {
  return (
    <div className="rounded-lg border">
      <Table className="whitespace-nowrap font-medium">
        <TableHeader>
          <TableRow className="">
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Speed</TableHead>
            <TableHead>Distance</TableHead>
            <TableHead className="text-right">Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.map((activity: any, idx: any) => (
            <TableRow key={idx}>
              <TableCell>
                <span>{formatDate(activity.startDate.toISOString())}</span>
              </TableCell>
              <TableCell className="text-2xl">
                {formatToEmoji(activity.type)}
              </TableCell>
              <TableCell>
                {formatMPerSecondToKmPerHour(activity.averageSpeed)} km/h
              </TableCell>
              <TableCell>{formatMToKm(activity.distance)} km</TableCell>
              <TableCell className="text-right">
                {secondsToHoursMinutes(activity.movingTime)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
