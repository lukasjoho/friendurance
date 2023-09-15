import Container from '@/components/Container';
import SiteHeader from '@/components/shared/SiteHeader';
import { Suspense } from 'react';
import FeedbackGrid from './FeedbackGrid';
import FeedbackGridFallback from './FeedbackGridFallback';

const FeedbackPage = () => {
  return (
    <Container className="flex flex-col gap-8 md:gap-16">
      <SiteHeader
        title="Feedback"
        subtitle="Vote on feedback or submit your own."
      />
      <Suspense fallback={<FeedbackGridFallback />}>
        <FeedbackGrid />
      </Suspense>
    </Container>
  );
};

export default FeedbackPage;
