'use client';
import { TeamAvatar, UserAvatar } from './UserAvatar';
import { Modal, ModalContent, ModalHeader, ModalTitle } from './shared/modal';

const TeamInfoModal = ({ data, type }: any) => {
  const { entity } = data.original;

  if (type == 'team') {
    return (
      <Modal>
        <ModalHeader>
          <ModalTitle>{entity.name}</ModalTitle>
        </ModalHeader>
        <ModalContent>
          <Team data={entity} />
        </ModalContent>
      </Modal>
    );
  }
  if (type == 'user') {
    return (
      <Modal>
        <ModalHeader>
          <ModalTitle>{entity.firstName}</ModalTitle>
        </ModalHeader>
        <ModalContent>
          <User data={entity} />
        </ModalContent>
      </Modal>
    );
  }
  return false;
};

export default TeamInfoModal;

const Team = ({ data }: any) => {
  const team = {
    name: data.name,
    imageUrl: data.imageUrl,
  };
  return (
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
  );
};

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
