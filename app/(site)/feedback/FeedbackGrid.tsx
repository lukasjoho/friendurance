import { wait } from '@/lib/helpers';
import { prisma } from '@/lib/prisma';
import FeedbackItem from './FeedbackItem';

const getAllFeedback = async () => {
  const feedbacks: any[] = await prisma.feedback.findMany({
    include: {
      _count: {
        select: { votes: true },
      },
      votes: true,
    },
  });
  //sort feedbacks by vote count. If vote count is the same, sort by latest creation date
  const sortedFeedbacks = feedbacks.sort((a, b) => {
    if (a._count.votes > b._count.votes) {
      return -1;
    } else if (a._count.votes < b._count.votes) {
      return 1;
    } else if (a.createdAt > b.createdAt) {
      return -1;
    } else if (a.createdAt < b.createdAt) {
      return 1;
    }
    return 0;
  });

  return sortedFeedbacks;
};

const FeedbackGrid = async () => {
  const feedbacks = await getAllFeedback();
  await wait();
  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      style={{ gridTemplateRows: 'masonry' }}
    >
      {feedbacks.map((feedback) => (
        <FeedbackItem feedback={feedback} key={feedback.id} />
      ))}
    </div>
  );
};

export default FeedbackGrid;
