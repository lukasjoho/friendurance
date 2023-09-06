'use client';
import { ChevronsUpDown } from 'lucide-react';
import { toast } from 'react-hot-toast';
import ToastBody from './ToastBody';
import { Button } from './ui/button';

const TeamSelector = () => {
  const handleClick = () => {
    toast(
      <ToastBody
        title="You can't switch team channels yet!"
        message="Creating multiple team channels and switching between them will be coming soon."
      />
    );
  };
  return (
    <Button
      className="group flex items-center justify-start gap-1 text-sm outline-none focus:outline-none md:gap-2 md:text-base"
      variant="outline"
      size="sm"
      onClick={handleClick}
    >
      <div className="grid aspect-square h-4 w-4 shrink-0 place-items-center overflow-hidden rounded-md bg-muted text-xs font-semibold md:h-5 md:w-5 md:text-xs">
        S
      </div>
      <span className="block w-12 overflow-hidden text-ellipsis whitespace-nowrap text-left md:w-auto">
        Strava Slayers
      </span>
      <ChevronsUpDown className="ml-auto h-4 w-4 text-muted-foreground group-hover:text-foreground" />
    </Button>
  );
};

export default TeamSelector;
