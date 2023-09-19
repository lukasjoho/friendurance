import Link from 'next/link';
import { TeamAvatar, UserAvatar } from './UserAvatar';
import { Modal, ModalContent, ModalHeader, ModalTitle } from './shared/modal';

const TeamInfoModal = ({ data }: any) => {
  const { entity } = data.original;

  return (
    <Modal id="teaminfomodal">
      <ModalHeader>
        <ModalTitle>{entity.name}</ModalTitle>
      </ModalHeader>
      <ModalContent>
        <Team data={entity} />
      </ModalContent>
    </Modal>
    // <div>
    //   <pre>{JSON.stringify(data, null, 2)}</pre>
    // </div>
  );
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
          <Link
            href={`/user/${member.userId}`}
            className="flex items-center gap-6"
            key={member.id}
          >
            <UserAvatar className="h-16 w-16" user={member} />
            <div className=" text-2xl font-medium">{member.firstName}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};
