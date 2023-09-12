import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import LogoutButton from './LogoutButton';
import { UserAvatar } from './UserAvatar';

const AvatarDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer">
          <UserAvatar />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarDropdown;
