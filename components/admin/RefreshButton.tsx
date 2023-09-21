'use client';
import { Loader2 } from 'lucide-react';
import React from 'react';
import toast from 'react-hot-toast';
import { Button } from '../ui/button';
import { refreshUserData } from './actions';

async function handleRefresh(event: React.MouseEvent<HTMLButtonElement>) {
  const id = (event.target as HTMLButtonElement).id;
  const res = await refreshUserData(id);
  if (res.success) {
    toast.success(res.message);
  } else {
    toast.error(res.message);
  }
}

interface RefreshButtonProps {
  id: string;
}

const RefreshButton = ({ id }: RefreshButtonProps) => {
  const [loading, setLoading] = React.useState(false);
  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    await handleRefresh(event);
    setLoading(false);
  };
  return (
    <Button
      size="md"
      variant="default"
      onClick={handleClick}
      id={id}
      disabled={loading}
      className="w-[110px]"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Refresh
        </>
      ) : (
        'Refresh'
      )}
    </Button>
  );
};

export default RefreshButton;
