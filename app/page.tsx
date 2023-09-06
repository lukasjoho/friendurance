import Container from '@/components/Container';
import { Icons } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

import landingPic from '../public/friendurance_intro.png';

export default async function Home() {
  return (
    <>
      <div className="flex w-full grow flex-col items-center justify-center">
        <Container>
          <div className="relative flex flex-col items-center gap-6">
            <Icons.logo className="w-[90%] md:w-[60%]" />
            <Image
              src={landingPic}
              alt="Happy 3d avatar runners running towards camera"
              className="-mb-12 w-full -translate-y-[15%] md:-mb-16 md:w-[40%]"
            />
            <Link
              href={`https://www.strava.com/oauth/authorize?client_id=${process.env.STRAVA_CLIENT_ID}&redirect_uri=${process.env.HOST_URL}/api/strava&response_type=code&scope=read,activity:read`}
            >
              <Button className="w-32" variant="brand">
                Login
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
}
