import { Card } from '@/components/ui/card';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { FC } from 'react';
import VoteItem from './VoteItem';

interface FeedbackItemProps {
  feedback: any;
}

const FeedbackItem: FC<FeedbackItemProps> = async ({ feedback }) => {
  const anonymousId = cookies().get('anonymousId')?.value;
  const userVote = await prisma.vote.findFirst({
    where: {
      anonymousId: anonymousId,
      feedbackId: feedback.id,
    },
  });
  let hasVoted = false;
  if (userVote) {
    hasVoted = true;
  }

  return (
    <Card className="flex gap-3 p-6 pr-12">
      <div className="flex flex-col items-center gap-1">
        <VoteItem feedback={feedback} hasVoted={hasVoted} />
        <div>{feedback._count.votes}</div>
      </div>
      <div>{feedback.content}</div>
    </Card>
  );
};

export default FeedbackItem;
