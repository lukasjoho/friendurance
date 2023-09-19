'use client';
import Container from '@/components/Container';
import { AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { FC, createContext, useContext, useState } from 'react';

import { Icons } from '@/components/Icons';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Link from 'next/link';
import NavLink from './NavLink';
import { NAV_ITEMS } from './constants';

const HeaderContext = createContext<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isOpen: false,
  setIsOpen: () => {},
});

interface MobileHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  avatarDropdown: any;
}

const MobileHeader: FC<MobileHeaderProps> = ({ avatarDropdown, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { className, ...rest } = props;
  return (
    <HeaderContext.Provider value={{ isOpen, setIsOpen }}>
      <div
        {...rest}
        className={cn('fixed top-0 z-40 w-full bg-background', className)}
      >
        <Container>
          <div className="relative flex h-12 items-center justify-between">
            <ToggleMenu />
            <Link href="/" className="mr-auto">
              <Icons.logo className="absolute left-1/2 top-1/2 w-1/3 -translate-x-1/2 -translate-y-1/2" />
            </Link>
            {avatarDropdown}
          </div>
        </Container>
        <MobileMenu />
      </div>
    </HeaderContext.Provider>
  );
};

export default MobileHeader;

const ToggleMenu = () => {
  const { isOpen, setIsOpen } = useContext(HeaderContext);
  return (
    <div onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}>
      {isOpen ? <X /> : <Menu />}
    </div>
  );
};

const MobileMenu = () => {
  const { isOpen, setIsOpen } = useContext(HeaderContext);
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute w-full overflow-hidden bg-background shadow-md"
          initial={{
            height: 0,
          }}
          animate={{
            height: 'auto',
          }}
          exit={{
            height: 0,
          }}
          transition={{
            duration: 0.3,
            ease: [0.74, 0, 0.19, 1.02],
          }}
          key="mobile-menu"
        >
          <Container>
            <nav>
              <ul className="pb-3">
                {NAV_ITEMS.map((item, idx) => {
                  if (!item.screens[0]) return;
                  return (
                    <NavLink
                      key={idx}
                      className="w-full py-2 pl-0.5 text-xl"
                      href={item.href}
                      onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
                    >
                      {item.label}
                    </NavLink>
                  );
                })}
              </ul>
            </nav>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
