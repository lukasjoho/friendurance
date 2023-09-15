import Container from '@/components/Container';
import LoginButton from '@/components/shared/LoginButton';
import { Card, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

const LoginPage = () => {
  return (
    <div className="flex grow items-center justify-center py-8 md:py-16">
      <Container className="flex justify-center">
        <Card className="grid w-full grid-cols-1 overflow-hidden md:w-3/4 md:grid-cols-2 lg:w-1/2">
          <div className="relative aspect-video  overflow-hidden md:aspect-square">
            <Image
              fill={true}
              style={{ objectFit: 'cover' }}
              alt=""
              src="https://res.cloudinary.com/dum2lqmke/image/upload/v1694785043/joho5829_Sporty_avatars_friends_3d_render_happy_running_cycling_8c19d4ce-e9b8-4d89-804b-50e7d53842ae_zoulrt.jpg"
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-4 p-3 py-12 md:p-6 md:py-6">
            <div className="text-center">
              <CardTitle className="mb-2 text-2xl">Login</CardTitle>
              <h2 className="text-muted-foreground">
                Join Friendurance and <br />
                elevate your Strava experience.
              </h2>
            </div>
            {/* <Button className="flex gap-2 bg-brand text-primary-foreground">
              <Icons.stravaRaw className="h-5 w-auto" />
              Login with Strava
            </Button> */}
            <LoginButton />
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default LoginPage;
