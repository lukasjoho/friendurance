import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getAuthUser } from '@/lib/db';
import LogoutButton from './LogoutButton';
import { UserAvatar } from './UserAvatar';
import LoginButton from './shared/LoginButton';

const AvatarDropdown = async () => {
  const user = await getAuthUser();
  if (!user) {
    return <LoginButton className="" size="sm" />;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer">
          <UserAvatar user={user} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarDropdown;
