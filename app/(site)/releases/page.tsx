import { allPosts } from '@/.contentlayer/generated';
import Container from '@/components/Container';
import SiteHeader from '@/components/shared/SiteHeader';
import { compareDesc } from 'date-fns';
import ReleaseItem from './ReleaseItem';

const ReleasesPage = async () => {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );
  return (
    <Container className="flex flex-col gap-8 md:gap-16">
      <SiteHeader
        title="Releases"
        subtitle="Follow along the evolution of Friendurance."
      />
      <div className="flex flex-col gap-8 md:gap-24">
        {posts.map((item: any) => {
          return <ReleaseItem key={item.slug} item={item} />;
        })}
      </div>
    </Container>
  );
};

export default ReleasesPage;
