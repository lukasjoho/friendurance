'use client';
import { setHasConnected } from '@/lib/actions';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Icons } from './Icons';
import ToastBody from './ToastBody';
import { Button } from './ui/button';

const Connect = ({ user }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const handleImport = async () => {
    setIsLoading(true);
    setProgress(1);
    const activitiesRes1 = await fetch(
      '/api/import/activities?per_page=50&page=1'
    );
    if (!activitiesRes1.ok) {
      toast.error(<ToastBody title="Error" message="Connection failed." />);
      setIsLoading(false);
      return;
    }
    setProgress(2);
    const activitiesRes2 = await fetch(
      '/api/import/activities?per_page=50&page=2'
    );
    if (!activitiesRes2.ok) {
      toast.error(<ToastBody title="Error" message="Connection failed." />);
      setIsLoading(false);
      return;
    }
    setProgress(3);
    const activitiesRes3 = await fetch(
      '/api/import/activities?per_page=50&page=3'
    );
    if (!activitiesRes3.ok) {
      toast.error(<ToastBody title="Error" message="Connection failed." />);
      setIsLoading(false);
      return;
    }
    setProgress(4);
    const activitiesRes4 = await fetch(
      '/api/import/activities?per_page=50&page=4'
    );
    if (!activitiesRes4.ok) {
      toast.error(<ToastBody title="Error" message="Connection failed." />);
      setIsLoading(false);
      return;
    }
    setProgress(5);
    const activitiesRes5 = await fetch(
      '/api/import/activities?per_page=50&page=5'
    );
    if (!activitiesRes5.ok) {
      toast.error(<ToastBody title="Error" message="Connection failed." />);
      setIsLoading(false);
      return;
    }
    setProgress(6);
    const activitiesRes6 = await fetch(
      '/api/import/activities?per_page=50&page=6'
    );
    if (!activitiesRes6.ok) {
      toast.error(<ToastBody title="Error" message="Connection failed." />);
      setIsLoading(false);
      return;
    }
    const res = await setHasConnected(user.userId);
    if (!res.success) {
      toast.error('Could not connect user.');
    }
    setProgress(7);
    toast.success('Data successfully connected.');
    setIsLoading(false);
    setIsRedirecting(true);
    router.push('/team');
  };
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-center">
        <h1 className="text-4xl font-semibold">Connect Strava</h1>
      </div>
      <div className="relative">
        <div className="relative">
          <Loader2 className="relative h-64 w-64 text-zinc-200" />
          <Loader2 className="absolute left-0 top-0 h-64 w-64 rotate-90 text-zinc-200" />
          {isLoading && (
            <Loader2 className="absolute left-0 top-0 h-64 w-64 animate-spin text-brand" />
          )}
          {isLoading && (
            <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center text-4xl font-semibold">
              {progress} / 7
            </div>
          )}
        </div>
      </div>

      <Button
        className="flex gap-2"
        variant="brand"
        onClick={handleImport}
        disabled={isLoading}
      >
        {!isLoading && !isRedirecting && (
          <>
            <Icons.stravaRaw className="h-5 w-auto" />
            <span>Connect</span>
          </>
        )}
        {isLoading && (
          <>
            <Icons.stravaRaw className="h-5 w-auto" />
            <span>Connecting...</span>
          </>
        )}
        {isRedirecting && (
          <>
            <Icons.stravaRaw className="h-5 w-auto" />
            <span>Redirecting...</span>
          </>
        )}
      </Button>
      <p className="px-6 text-center text-sm text-muted-foreground">
        By clicking Connect Friendurance will establish a connection to your
        public Strava data. <br />
        You can revoke the access at any time. (The connection process can take
        a couple of seconds.)
      </p>
    </div>
  );
};

export default Connect;
