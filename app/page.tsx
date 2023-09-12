import Container from '@/components/Container';
import { Icons } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

import LoginButton from '@/components/shared/LoginButton';
import { Medal } from 'lucide-react';
import landingPic from '../public/friendurance_intro.png';

export default async function Home() {
  return (
    <>
      <div className="flex w-full grow flex-col items-center justify-center">
        <Container>
          <div className="relative flex flex-col items-center gap-8">
            <Link href="/leaderboard/run">
              <Button
                variant="outline"
                className="flex h-9 gap-2 rounded-full px-8 text-muted-foreground"
              >
                Team Leaderboards
                <Medal className="w-5" />
              </Button>
            </Link>
            <Icons.logo className="w-[90%] md:w-[60%]" />
            <Image
              src={landingPic}
              alt="Happy 3d avatar runners running towards camera"
              className="-mb-12 w-full -translate-y-[15%] md:-mb-16 md:w-[40%]"
            />
            <LoginButton />
          </div>
        </Container>
      </div>
    </>
  );
}
