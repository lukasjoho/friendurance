import { cn } from '@/lib/utils';
import Link from 'next/link';
import { FC } from 'react';
import { Button, ButtonProps } from '../ui/button';

interface LoginButtonProps extends ButtonProps {}

const LoginButton: FC<LoginButtonProps> = (props) => {
  const { className, ...rest } = props;
  return (
    <Link
      href={`https://www.strava.com/oauth/authorize?client_id=${process.env.STRAVA_CLIENT_ID}&redirect_uri=${process.env.HOST_URL}/api/strava&response_type=code&scope=read,activity:read`}
    >
      <Button className={cn('w-auto', className)} variant="brand" {...rest}>
        Login
      </Button>
    </Link>
  );
};

export default LoginButton;
