import Link from 'next/link';
import Container from './Container';
import FeedbackButton from './FeedbackButton';
import { Icons } from './Icons';

const Header = async () => {
  return (
    <div className="flex h-14 w-full items-center border-b ">
      <Container className="flex items-center justify-between">
        <Link href="/">
          <Icons.logo className="h-4 md:h-5" />
        </Link>
        <FeedbackButton />
      </Container>
    </div>
  );
};

export default Header;
