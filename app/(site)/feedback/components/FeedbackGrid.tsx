import Container from '@/components/layout/Container';
import { prisma } from '@/lib/clients/prisma';
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
  return (
    <Container className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {feedbacks.map((feedback) => (
        <FeedbackItem feedback={feedback} key={feedback.id} />
      ))}
    </Container>
  );
};

export default FeedbackGrid;
