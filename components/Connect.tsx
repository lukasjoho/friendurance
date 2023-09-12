'use client';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Icons } from './Icons';
import ToastBody from './ToastBody';
import { Button } from './ui/button';

const Connect = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const handleImport = async () => {
    setIsLoading(true);
    const statsRes = await fetch('/api/import/stats');
    if (!statsRes.ok) {
      toast.error(
        <ToastBody title="Error" message="Could not import athlete stats." />
      );
    }
    setProgress(1);
    const activitiesRes = await fetch('/api/import/activities');
    if (!activitiesRes.ok) {
      toast.error(
        <ToastBody
          title="Error"
          message="Could not import athlete activities."
        />
      );
    }
    if (statsRes.ok && activitiesRes.ok) {
      setProgress(2);
      toast.success(
        <ToastBody title="Success" message="Data successfully connected." />
      );
    }
    router.refresh();
    setIsLoading(false);
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
              {progress} / 2
            </div>
          )}
        </div>
        {/* {!isLoading && (
          <Loader2 className="strke-green-500 absolute left-0 top-0 h-64 w-64 text-green-500" />
        )} */}
      </div>

      <Button
        className="flex gap-2"
        variant="brand"
        onClick={handleImport}
        disabled={isLoading}
      >
        {!isLoading && (
          <>
            <Icons.stravaRaw className="h-5 w-auto" />
            <span>Connect</span>
          </>
        )}
        {isLoading && (
          <>
            <Icons.stravaRaw className="h-5 w-auto" />
            <span>Connecting... {`${progress} / 2`}</span>
          </>
        )}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        By clicking "Connect" Friendurance will establish a connection to your
        public Strava data. <br />
        You can revoke the access at any time. (The connection process can take
        a couple of seconds.)
      </p>
    </div>
  );
};

export default Connect;
