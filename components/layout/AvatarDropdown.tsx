import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getAuthUser } from '@/lib/db';
import { LayoutDashboard, Users2 } from 'lucide-react';
import Link from 'next/link';
import LoginButton from '../shared/LoginButton';
import LogoutButton from '../shared/LogoutButton';
import { UserAvatar } from '../shared/UserAvatar';

const AvatarDropdown = async () => {
  const user = await getAuthUser();
  if (!user) {
    return <LoginButton className="" size="xs" />;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer">
          <UserAvatar user={user} className="h-8 w-8" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem asChild>
          <Link href="/team">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Teamboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/teams">
            <Users2 className="mr-2 h-4 w-4" />
            <span>Teams</span>
          </Link>
        </DropdownMenuItem>

        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarDropdown;
