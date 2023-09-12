import Container from '../Container';
import { Skeleton } from '../ui/skeleton';

const SkeletonLeaderboardTable = () => {
  return (
    <Container className="">
      <div className="space-y-4 rounded-xl border p-4">
        <Skeleton className="h-[50px] w-full rounded-xl" />
        <Skeleton className="h-[100px] w-full rounded-xl" />
        <Skeleton className="h-[100px] w-full rounded-xl" />
        <Skeleton className="h-[100px] w-full rounded-xl" />
      </div>
    </Container>
  );
};

export default SkeletonLeaderboardTable;
