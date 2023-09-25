'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useState } from 'react';
import { buttonVariants } from '../../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import FeedbackForm from './FeedbackForm';

const FeedbackButton = () => {
  console.log('FB rendered');
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger>
        <div
          className={cn(
            buttonVariants({ variant: 'outline', size: 'xs' }),
            'text-sm md:text-base'
          )}
        >
          Feedback
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Feedback</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="space-y-3 p-2">
          <FeedbackForm onOpenChange={setOpen} layout="dropdown" />
          <Link
            className={cn(buttonVariants({ variant: 'secondary' }), 'w-full')}
            href="/feedback"
            onClick={() => setOpen(false)}
          >
            View all feedback
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FeedbackButton;
