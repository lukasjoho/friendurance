'use client';

import { cn } from '@/lib/utils';
import { LayoutDashboard, Medal } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Nav = ({ user }: any) => {
  return (
    <div className="flex gap-4 md:gap-8">
      {!user ? (
        <>
          <NavLink href="/leaderboard/run">
            <span className="hidden md:inline"> Leaderboard</span>
            <Medal className="h-4 w-4" />
          </NavLink>
        </>
      ) : (
        <>
          <NavLink href="/team">
            <span className="hidden md:inline"> Teamboard</span>
            <LayoutDashboard className="h-4 w-4" />
          </NavLink>
          <NavLink href="/leaderboard/run">
            <span className="hidden md:inline"> Leaderboard</span>
            <Medal className="h-4 w-4" />
          </NavLink>
        </>
      )}
    </div>
  );
};

export default Nav;

const NavLink = ({ href, children }: any) => {
  const pathname = usePathname();
  const isActive = pathname.split('/')[1] === href.split('/')[1];
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-1 font-medium text-muted-foreground',
        isActive && 'text-foreground'
      )}
    >
      {children}
    </Link>
  );
};
