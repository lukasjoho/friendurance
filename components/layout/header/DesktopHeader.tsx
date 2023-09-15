import AvatarDropdown from '@/components/AvatarDropdown';
import Container from '@/components/Container';
import FeedbackButton from '@/components/FeedbackButton';
import { Icons } from '@/components/Icons';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { FC } from 'react';
import NavLink from './NavLink';
import { NAV_ITEMS } from './constants';

interface DesktopHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const DesktopHeader: FC<DesktopHeaderProps> = (props) => {
  const { className, ...rest } = props;
  return (
    <div
      className={cn(
        'relative z-40 flex h-14 w-full shrink-0 items-center border-b ',
        className
      )}
      {...rest}
    >
      <Container className="flex h-full items-center justify-end gap-8">
        <Link href="/" className="mr-auto">
          <Icons.logo className="h-3 fill-foreground md:h-5" />
        </Link>
        <nav>
          <ul className="flex gap-8">
            {NAV_ITEMS.map((item, idx) => {
              if (!item.screens[1]) return;
              return (
                <NavLink key={idx} href={item.href}>
                  {item.label}
                </NavLink>
              );
            })}
          </ul>
        </nav>
        <div className="flex items-center gap-1.5 md:gap-3">
          <FeedbackButton />
          <AvatarDropdown />
        </div>
      </Container>
    </div>
  );
};

export default DesktopHeader;
