'use client';
import { useWindowSize } from '@/lib/hooks/useWindowSize';
import { TeamAvatar, UserAvatar } from './UserAvatar';
import {
  Modal,
  ModalContents,
  ModalOpenButton,
} from './shared/GlobalModal/Modal';

const TeamInfoModal = ({ data, type, children }: any) => {
  const { entity } = data.original;
  let size = useWindowSize();
  return (
    <Modal>
      <ModalOpenButton>{children}</ModalOpenButton>
      {type === 'team' ? <Team data={entity} /> : <User data={entity} />}
    </Modal>
  );
};

export default TeamInfoModal;

const Team = ({ data }: any) => {
  let size = useWindowSize();
  const team = {
    name: data.name,
    imageUrl: data.imageUrl,
  };
  return (
    <ModalContents title={data.name} size={size}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <TeamAvatar
            className="aspect-square h-auto w-full text-10xl"
            team={team}
          />
        </div>
        <div className="space-y-4 rounded-lg border p-6">
          <div className="text-muted-foreground">Members</div>
          {data.members.map((member: any) => (
            <div className="flex items-center gap-6" key={member.id}>
              <UserAvatar className="h-16 w-16" user={member} />
              <div className=" text-2xl font-medium">{member.firstName}</div>
            </div>
          ))}
        </div>
      </div>
    </ModalContents>
  );
};

const User = ({ data }: any) => {
  let size = useWindowSize();
  const user = {
    firstName: data.firstName,
    lastName: data.lastName,
    imageUrl: data.imageUrl,
  };
  return (
    <ModalContents title={data.firstName} size={size} maxSize="sm">
      <div className="flex w-full justify-center">
        <UserAvatar className="h-auto w-1/2" user={user} />
      </div>
    </ModalContents>
  );
};
