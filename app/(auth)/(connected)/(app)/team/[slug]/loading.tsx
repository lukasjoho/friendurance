import Container from '@/components/layout/Container';
import { Skeleton } from '@/components/ui/skeleton';

const LoadingPage = () => {
  return (
    <Container>
      <div className="space-y-3 pt-3 md:space-y-8 md:pt-8">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="aspect-video w-full" />
      </div>
    </Container>
  );
};

export default LoadingPage;
