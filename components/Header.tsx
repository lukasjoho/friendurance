import { getAuthUser } from '@/lib/db';
import Link from 'next/link';
import AvatarDropdown from './AvatarDropdown';
import Container from './Container';
import FeedbackButton from './FeedbackButton';
import { Icons } from './Icons';

const Header = async () => {
  const user = await getAuthUser();
  return (
    <div className="flex h-14 w-full items-center border-b ">
      <Container className="flex items-center justify-between">
        <Link href="/">
          <Icons.logo className="h-3 md:h-5" />
        </Link>
        <div className="flex items-center gap-2 md:gap-4">
          <FeedbackButton />
          <AvatarDropdown />
        </div>
      </Container>
    </div>
  );
};

export default Header;
