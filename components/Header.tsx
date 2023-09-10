import { getAuthUser } from '@/lib/db';
import Link from 'next/link';
import Container from './Container';
import FeedbackButton from './FeedbackButton';
import { Icons } from './Icons';
import TeamSelector from './TeamSelector';
import UserAvatar from './UserAvatar';

const Header = async () => {
  const user = await getAuthUser();
  return (
    <div className="flex h-14 w-full items-center border-b ">
      <Container className="flex items-center justify-between">
        <Link href="/">
          <Icons.logo className="h-3 md:h-5" />
        </Link>
        <div className="flex items-center gap-2 md:gap-4">
          <TeamSelector />
          <FeedbackButton />
          <UserAvatar />
        </div>
      </Container>
    </div>
  );
};

export default Header;
