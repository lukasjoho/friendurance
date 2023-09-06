import Link from 'next/link';
import Container from './Container';
import FeedbackButton from './FeedbackButton';
import { Icons } from './Icons';
import TeamSelector from './TeamSelector';

const Header = async () => {
  return (
    <div className="flex h-14 w-full items-center border-b ">
      <Container className="flex items-center justify-between">
        <Link href="/">
          <Icons.logo className="h-3 md:h-5" />
        </Link>
        <div className="flex gap-2 md:gap-4">
          <TeamSelector />
          <FeedbackButton />
        </div>
      </Container>
    </div>
  );
};

export default Header;
