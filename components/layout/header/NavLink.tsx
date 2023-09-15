'use client';
import { cn } from '@/lib/utils';
import Link, { LinkProps } from 'next/link';
import { FC } from 'react';
import { useIsActive } from './useIsActive';

interface NavLinkProps
  extends LinkProps,
    React.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

const NavLink: FC<NavLinkProps> = ({ href, children, ...props }) => {
  const isActive = useIsActive(href);

  const { className, ...rest } = props;
  return (
    <Link href={href} {...rest}>
      <li
        className={cn(
          'font-medium text-muted-foreground transition duration-100 hover:text-foreground',
          isActive && 'text-foreground',
          className
        )}
      >
        {children}
      </li>
    </Link>
  );
};

export default NavLink;
