'use client';

import Cookies from 'js-cookie';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { DropdownMenuItem } from '../ui/dropdown-menu';

const LogoutButton = () => {
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    router.refresh();
  };
  return (
    <DropdownMenuItem onClick={handleLogout}>
      <LogOut className="mr-2 h-4 w-4" />
      <span>Log out</span>
    </DropdownMenuItem>
  );
};

export default LogoutButton;
