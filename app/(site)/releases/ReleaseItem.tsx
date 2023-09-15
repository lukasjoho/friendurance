import Image from 'next/image';

import { formatDate } from '@/lib/helpers';
import Mdx from './Mdx';

interface ReleaseItemType {
  title: string;
  date: string;
  imageUrl: string;
  body: {
    code: any;
  };
}

interface LaunchItemProps {
  item: ReleaseItemType;
}

const ReleaseItem = ({ item }: LaunchItemProps) => {
  const { title, date, imageUrl, body } = item;
  return (
    <article className="grid grid-cols-12 gap-3 md:gap-4">
      <div className="sticky top-0 col-span-12 md:col-span-6">
        <div className="sticky top-8">
          <h2 className="text-3xl font-medium">{title}</h2>
          <div className="text-xl font-medium text-muted-foreground">
            {formatDate(date)}
          </div>
        </div>
      </div>
      <div className="col-span-12 space-y-6 md:col-span-6">
        <div className="flex flex-col gap-3 md:gap-6">
          <div className="relative aspect-[2/1] overflow-hidden rounded-lg border bg-card shadow-sm">
            <Image
              src={imageUrl}
              alt="i"
              fill={true}
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
        <Mdx code={body.code} />
      </div>
    </article>
  );
};

export default ReleaseItem;
