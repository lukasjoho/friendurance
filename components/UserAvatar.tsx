import { getAuthUser } from '@/lib/db';
import { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface UserAvatarProps {}

const UserAvatar: FC<UserAvatarProps> = async () => {
  const user = await getAuthUser();
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src={user?.imageUrl || undefined} />
      <AvatarFallback>
        {user?.firstName?.charAt(0) + '' + user?.lastName?.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
