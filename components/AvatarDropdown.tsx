import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getAuthUser } from '@/lib/db';
import { LayoutDashboard, ListOrdered } from 'lucide-react';
import Link from 'next/link';
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
        <DropdownMenuItem asChild>
          <Link href="/team">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Team Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/leaderboard/run">
            <ListOrdered className="mr-2 h-4 w-4" />
            <span>Leaderboard </span>
          </Link>
        </DropdownMenuItem>
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarDropdown;
