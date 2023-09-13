import Container from '@/components/Container';
import { Suspense } from 'react';
import FeedbackGrid from './FeedbackGrid';

const FeedbackPage = () => {
  return (
    <div className="grow pt-8 md:pt-16">
      <Container className="flex flex-col gap-8 md:gap-16">
        <div className="text-center">
          <h1 className="font-tungsten text-5xl">Feedback</h1>
          <h2 className="text-muted-foreground">
            Vote on feedback or submit your own.
          </h2>
        </div>
        <Suspense fallback={<div>Loading feedback...</div>}>
          <FeedbackGrid />
        </Suspense>
      </Container>
    </div>
  );
};

export default FeedbackPage;
