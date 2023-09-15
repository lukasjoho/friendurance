import { Card, CardContent } from '@/components/ui/card';
import { prisma } from '@/lib/clients/prisma';
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
    <Card>
      <CardContent className="flex gap-3 pt-3 md:pt-6">
        <div className="flex flex-col items-center gap-1">
          <VoteItem feedback={feedback} hasVoted={hasVoted} />
          <div>{feedback._count.votes}</div>
        </div>
        <div>{feedback.content}</div>
      </CardContent>
    </Card>
  );
};

export default FeedbackItem;
