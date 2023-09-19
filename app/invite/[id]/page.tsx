import { UserAvatar } from '@/components/UserAvatar';
import InviteLoginButton from '@/components/shared/InviteLoginButton';
import { Card } from '@/components/ui/card';
import { prisma } from '@/lib/clients/prisma';
import { getAuthUser } from '@/lib/db';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const InvitePage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { id } = params;
  const invite = await prisma.invite.findUnique({
    where: {
      id,
    },
    include: {
      invitedBy: true,
      team: true,
    },
  });
  if (!invite) {
    notFound();
  }
  const user = await getAuthUser();
  if (user) {
    await prisma.user.update({
      where: {
        userId: user.userId,
      },
      data: {
        currentTeam: {
          connect: {
            slug: invite.team.slug,
          },
        },
        teams: {
          connect: {
            slug: invite.team.slug,
          },
        },
      },
    });
  }
  return (
    <div className="flex grow items-center justify-center py-8 md:py-16">
      {/* <pre>{JSON.stringify(invite, null, 2)}</pre> */}
      <Card className="grid w-full grid-cols-1 overflow-hidden md:w-3/4 md:grid-cols-2 lg:w-1/2">
        <div className="flex flex-col items-center justify-center gap-6 p-3 text-center md:gap-12 md:p-6">
          <h1 className="text-3xl font-medium">You are invited</h1>
          <div className="flex items-center gap-4 px-6 md:px-12">
            <UserAvatar user={invite.invitedBy} className="h-16 w-16" />
            <p className="text-left text-base">
              {invite.invitedBy.firstName} has invited you to join team
              {invite.team.name} on Friendurance.
            </p>
          </div>
          <InviteLoginButton className="w-full" inviteId={invite.id} />
        </div>
        <div className="relative aspect-video  overflow-hidden md:aspect-square">
          <Image
            fill={true}
            style={{ objectFit: 'cover' }}
            alt=""
            src="https://res.cloudinary.com/dum2lqmke/image/upload/v1695153132/joho5829_Sporty_avatars_friends_3d_render_happy_running_big_pos_2c2ebcdf-31c5-4bd7-ae9c-fa49cf7d0e81_apoagy.png"
          />
        </div>
      </Card>
    </div>
  );
};

export default InvitePage;
