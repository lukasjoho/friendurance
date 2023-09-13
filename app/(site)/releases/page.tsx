import { allPosts } from '@/.contentlayer/generated';
import Container from '@/components/Container';
import { compareDesc } from 'date-fns';
import ReleaseItem from './ReleaseItem';

const ReleasesPage = async () => {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );
  return (
    <div className="grow pt-8 md:pt-16">
      <Container className="flex flex-col gap-8 md:gap-16">
        <div className="text-center">
          <h1 className="font-tungsten text-5xl">Releases</h1>
          <h2 className="text-muted-foreground">
            Follow along the evolution of Friendurance.
          </h2>
        </div>
        <div className="flex flex-col gap-8 md:gap-24">
          {posts.map((item: any) => {
            return <ReleaseItem key={item.slug} item={item} />;
          })}
        </div>
      </Container>
    </div>
  );
};

export default ReleasesPage;
