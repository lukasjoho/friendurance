import Container from '@/components/Container';
import { Icons } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

import LoginButton from '@/components/shared/LoginButton';
import { cn } from '@/lib/utils';
import { Medal } from 'lucide-react';
import { Suspense } from 'react';
import landingPic from '../public/friendurance_intro.png';

const HomePage = () => {
  return (
    <div className="flex w-full grow flex-col items-center justify-center ">
      <Container>
        <div className="relative flex flex-col items-center gap-8">
          <Link href="/leaderboard/run">
            <Button
              variant="outline"
              className="flex h-9 gap-2 rounded-full border-brand px-8 text-brand hover:bg-brand/5 hover:text-brand hover:brightness-110"
            >
              Team Leaderboards
              <Medal className="w-5" />
            </Button>
          </Link>
          <Icons.tagline className="w-[90%] md:w-[60%]" />
          <Image
            src={landingPic}
            alt="Happy 3d avatar runners running towards camera"
            className="-mb-12 w-full -translate-y-[15%] md:-mb-16 md:w-[40%]"
          />
          <Suspense
            fallback={
              <Link
                href={`https://www.strava.com/oauth/authorize?client_id=${process.env.STRAVA_CLIENT_ID}&redirect_uri=${process.env.HOST_URL}/api/strava&response_type=code&scope=read,activity:read`}
              >
                <Button className={cn('w-40')} variant="brand">
                  Login
                </Button>
              </Link>
            }
          >
            <LoginButton className="w-40" />
          </Suspense>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
