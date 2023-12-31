import { User } from '@/lib/types';
import { cn } from '@/lib/utils';
import { AvatarProps } from '@radix-ui/react-avatar';
import { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, 'firstName' | 'lastName' | 'imageUrl'>;
}

export const UserAvatar: FC<UserAvatarProps> = ({ user, ...props }) => {
  if (!user) {
    return false;
  }
  const { firstName, lastName, imageUrl } = user;
  const { className, ...rest } = props;
  return (
    <Avatar className={cn('h-8 w-8', props.className)} {...rest}>
      <AvatarImage src={imageUrl || undefined} />
      <AvatarFallback>
        {firstName?.charAt(0) + '' + lastName?.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
};

interface TeamAvatarProps extends AvatarProps {
  team: any;
}

export const TeamAvatar: FC<TeamAvatarProps> = ({ team, ...props }) => {
  if (!team) {
    return false;
  }
  const { name, imageUrl } = team;

  return (
    <Avatar className={cn('h-8 w-8 rounded-xl border', props.className)}>
      <AvatarImage className="h-full w-full" src={imageUrl || undefined} />
      <AvatarFallback className={cn('rounded-xl border', props.className)}>
        {name.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
};
