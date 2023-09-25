import { allPosts } from '@/.contentlayer/generated';
import Container from '@/components/layout/Container';
import RegularPageLayout from '@/components/layout/RegularPageLayout';
import { compareDesc } from 'date-fns';
import ReleaseItem from './ReleaseItem';

const ReleasesPage = async () => {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );
  return (
    <RegularPageLayout
      title="Releases"
      subtitle="Follow along the evolution of Friendurance."
    >
      <Container>
        <div className="flex flex-col gap-8 md:gap-24">
          {posts.map((item: any) => {
            return <ReleaseItem key={item.slug} item={item} />;
          })}
        </div>
      </Container>
    </RegularPageLayout>
  );
};

export default ReleasesPage;
