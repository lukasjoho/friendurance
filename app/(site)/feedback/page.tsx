import RegularPageLayout from '@/components/layout/RegularPageLayout';
import FeedbackForm from '@/components/shared/feedback/FeedbackForm';
import { createMetaDataObject } from '@/lib/helpers/createMetaDataObject';
import { Metadata } from 'next';
import { Suspense } from 'react';
import FeedbackGrid from './components/FeedbackGrid';
import FeedbackGridFallback from './components/FeedbackGridFallback';

export const metadata: Metadata = createMetaDataObject({
  title: 'Feedback',
  description: 'View, vote and leave feedback about the Friendurance app.',
  slug: 'feedback',
  imageUrl:
    'https://res.cloudinary.com/dum2lqmke/image/upload/v1694790329/feedback_sluite.jpg',
});

const FeedbackPage = () => {
  return (
    <RegularPageLayout
      title="Feedback"
      subtitle="Vote on feedback or submit your own."
    >
      <FeedbackForm className="-my-2" layout="base" />
      <Suspense fallback={<FeedbackGridFallback />}>
        <FeedbackGrid />
      </Suspense>
    </RegularPageLayout>
  );
};

export default FeedbackPage;
