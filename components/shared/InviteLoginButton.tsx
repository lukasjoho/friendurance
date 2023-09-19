import { getAuthUser } from '@/lib/db';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { FC } from 'react';
import { Button, ButtonProps } from '../ui/button';

interface LoginButtonProps extends ButtonProps {
  inviteId?: string;
}

const InviteLoginButton: FC<LoginButtonProps> = async (props) => {
  const { className, inviteId, ...rest } = props;
  const user = await getAuthUser();
  const redirectUri = encodeURIComponent(
    `${process.env.HOST_URL}/api/strava?invite_id=${inviteId}`
  );
  if (!user) {
    return (
      <Link
        href={`https://www.strava.com/oauth/authorize?client_id=${process.env.STRAVA_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=read,activity:read`}
      >
        <Button
          className={cn('w-auto px-12', className)}
          variant="brand"
          {...rest}
        >
          Login with Strava
        </Button>
      </Link>
    );
  }
  return (
    <Link href={`${process.env.HOST_URL}/team`}>
      <Button
        className={cn('w-auto px-12', className)}
        variant="brand"
        {...rest}
      >
        Join team
      </Button>
    </Link>
  );
};

export default InviteLoginButton;
