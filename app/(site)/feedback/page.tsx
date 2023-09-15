import RegularPageLayout from '@/components/layout/RegularPageLayout';
import { Suspense } from 'react';
import FeedbackGrid from './FeedbackGrid';
import FeedbackGridFallback from './FeedbackGridFallback';

const FeedbackPage = () => {
  return (
    <RegularPageLayout
      title="Feedback"
      subtitle="Vote on feedback or submit your own."
    >
      <Suspense fallback={<FeedbackGridFallback />}>
        <FeedbackGrid />
      </Suspense>
    </RegularPageLayout>
  );
};

export default FeedbackPage;
