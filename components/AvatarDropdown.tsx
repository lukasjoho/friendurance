import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getAuthUser } from '@/lib/db';
import { LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import LogoutButton from './LogoutButton';
import { UserAvatar } from './UserAvatar';
import LoginButton from './shared/LoginButton';

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

        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarDropdown;
