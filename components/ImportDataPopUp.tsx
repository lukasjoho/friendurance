'use client';
import { Activity, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import Container from './Container';
import { Icons } from './Icons';
import ToastBody from './ToastBody';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Button } from './ui/button';

const ImportDataPopUp = () => {
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
    <Container>
      <Alert>
        <Activity className="h-4 w-4" />
        <div className="flex justify-between">
          <div>
            <AlertTitle>Connect Strava data</AlertTitle>
            <AlertDescription>
              You are logged in, but havent connected your Strava data yet. Hit
              Connect to do so. You can revoke the data access at any time.
            </AlertDescription>
          </div>
          <Button
            className="flex gap-2 self-end"
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
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />{' '}
                <span>Connecting... {`${progress} / 2`}</span>
              </>
            )}
          </Button>
        </div>
      </Alert>
    </Container>
  );
};

export default ImportDataPopUp;
