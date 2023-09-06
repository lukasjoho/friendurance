'use client';

import { useState } from 'react';
import FeedbackForm from './FeedbackForm';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const FeedbackButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger>
        <Button variant="outline" size="sm">
          Feedback
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Feedback</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="p-2">
          <FeedbackForm onOpenChange={setOpen} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FeedbackButton;
