import AvatarDropdown from '@/components/AvatarDropdown';
import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';

const Header = () => {
  return (
    <>
      <MobileHeader className="md:hidden" avatarDropdown={<AvatarDropdown />} />
      <DesktopHeader className="hidden md:block" />
    </>
  );
};

export default Header;
