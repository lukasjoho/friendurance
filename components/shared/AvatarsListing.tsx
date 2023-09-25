import { cn } from '@/lib/utils';
import { FC } from 'react';
import { UserAvatar } from './UserAvatar';

interface AvatarListingProps {
  users: any;
  max?: number;
  avatarClassName?: string;
}

const AvatarsListing: FC<AvatarListingProps> = ({
  users,
  avatarClassName,
  max = 5,
}) => {
  const MAX_AVATARS = max;
  const remainingUsers = users.length - MAX_AVATARS;
  return (
    <div className="flex">
      {users.slice(0, MAX_AVATARS).map((user: any, idx: number) => (
        <UserAvatar
          key={user.id}
          user={user}
          className={cn(
            'box-content h-4 w-4 border-2 border-white text-xs md:h-6 md:w-6',
            avatarClassName
          )}
          style={{
            marginLeft: idx === 0 ? 0 : '-8px',
          }}
        />
      ))}

      {remainingUsers > 0 && (
        <div className="relative z-10 -ml-2 box-content flex h-4 w-4 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-muted text-xs md:h-6 md:w-6">
          {`+ ${remainingUsers}`}{' '}
        </div>
      )}
    </div>
  );
};

export default AvatarsListing;
