import Container from '@/components/Container';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

import HomeTitle from '@/components/HomeTitle';
import LoginButton from '@/components/shared/LoginButton';
import { cn } from '@/lib/utils';
import { Medal } from 'lucide-react';
import { Suspense } from 'react';
import landingPic from '../public/friendurance_intro.png';

const HomePage = () => {
  return (
    <div className="flex w-full grow flex-col items-center justify-center pb-8 pt-8 md:pb-16 md:pt-16">
      <Container>
        <div className="relative flex flex-col items-center gap-6">
          <Link href="/leaderboard/run">
            <Button
              variant="outline"
              className="flex h-8 items-center gap-2 rounded-full border-brand px-8 text-brand hover:bg-brand/5 hover:text-brand hover:brightness-110"
            >
              Team Leaderboards
              <Medal className="w-4" />
            </Button>
          </Link>
          <HomeTitle />
          <Image
            src={landingPic}
            alt="Happy 3d avatar runners running towards camera"
            className="-mb-16 w-[80%] max-w-[500px] -translate-y-[25%] sm:-mb-20 sm:w-[70%] md:-mb-16 md:w-[40%] md:-translate-y-[25%] lg:w-[30%]"
          />
          <p className="text-center">
            Elevate your Strava experience with Friendurance. <br />
            Connect your Strava account, create or join a team and enjoy brand
            new metrics.
          </p>
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
