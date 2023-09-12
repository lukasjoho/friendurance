import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getAuthUser } from '@/lib/db';
import LogoutButton from './LogoutButton';
import { UserAvatar } from './UserAvatar';

const AvatarDropdown = async () => {
  const user = await getAuthUser();

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
