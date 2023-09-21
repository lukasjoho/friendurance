import MemberRow from './MemberRow';
import { TeamAvatar } from './UserAvatar';
import { Modal, ModalContent, ModalHeader, ModalTitle } from './shared/modal';
import { Table, TableBody, TableHead, TableHeader, TableRow } from './ui/table';

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
      <div className="space-y-2">
        <TeamAvatar
          className="aspect-square h-auto w-full text-10xl"
          team={team}
        />
        {/* <Link href={} className={cn(buttonVariants({ variant: 'default' }))}>
          <LayoutDashboard className="h-5 w-5" /> View Team Dashboard
        </Link>
        <Button className="flex w-full gap-2 rounded-lg"></Button> */}
      </div>
      <div>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Members</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.members.map((member: any, idx: any) => (
                <MemberRow member={member} key={member.userId} />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
