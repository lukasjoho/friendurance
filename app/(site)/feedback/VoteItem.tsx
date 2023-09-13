'use client';

import { FC } from 'react';

import { createVote } from '@/lib/actions';
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';

interface VoteItemProps {
  feedback: any;
  hasVoted: boolean;
}

const VoteItem: FC<VoteItemProps> = ({ feedback, hasVoted }) => {
  const handleClick = async () => {
    await createVote(feedback.id);
  };
  return (
    <div onClick={handleClick} className="cursor">
      <Heart
        className={cn(
          'fill-transparent stroke-foreground transition duration-300',
          hasVoted && 'fill-brand stroke-brand'
        )}
      />
    </div>
  );
};

export default VoteItem;
