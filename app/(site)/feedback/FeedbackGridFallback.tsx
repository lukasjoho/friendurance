import { Skeleton } from '@/components/ui/skeleton';

const FeedbackGridFallback = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 9 }).map((item, idx) => (
        <Skeleton key={idx} className="aspect-[32/9]" />
      ))}
    </div>
  );
};

export default FeedbackGridFallback;
