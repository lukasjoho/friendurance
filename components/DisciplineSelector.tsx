'use client';
import { Discipline, disciplines } from '@/lib/data/disciplines';
import { cn } from '@/lib/utils';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FC } from 'react';

interface DisciplineSelectorProps {
  discipline: Discipline;
}

const DisciplineSelector: FC<DisciplineSelectorProps> = () => {
  return (
    <div className="inline-flex rounded-md bg-muted p-1 text-muted-foreground">
      {disciplines.map((discipline) => (
        <TabItem discipline={discipline} key={discipline.slug}>
          {discipline.titlePrefix}
        </TabItem>
      ))}
    </div>
  );
};

export default DisciplineSelector;

interface TabItemProps {
  discipline: Discipline;
  children: React.ReactNode | React.ReactNode[];
}

const TabItem: FC<TabItemProps> = ({ discipline, children }) => {
  const path = usePathname();
  const disciplinePath = path.split('/leaderboard/')[1];
  const isActive = disciplinePath === discipline.slug;
  return (
    <Link href={`/leaderboard/${discipline.slug}`} scroll={false}>
      <button
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium',
          isActive && 'bg-background text-foreground shadow-sm'
        )}
      >
        {children}
      </button>
    </Link>
  );
};

const dateRanges = [
  //   {
  //     value: 'last-week',
  //     label: 'Last week',
  //     days: 7,
  //   },
  {
    value: 'last-month',
    label: 'Last month',
    days: 30,
  },
  {
    value: 'last-year',
    label: 'Last year',
    days: 365,
  },
];

export const DateRangeSelector: FC<any> = () => {
  const router = useRouter();
  const handleDateRangeSelection = (dateRange: any) => {
    Cookies.set('dateRange', dateRange.value);
    router.refresh();
  };

  const dateRangeCookie = Cookies.get('dateRange');

  return (
    <div className="inline-flex rounded-md bg-muted p-1 text-muted-foreground">
      {dateRanges.map((dateRange, idx) => {
        const isActive = dateRangeCookie === dateRange.value;
        return (
          <button
            className={cn(
              'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium',
              isActive && 'bg-background text-foreground shadow-sm'
            )}
            onClick={() => handleDateRangeSelection(dateRange)}
            key={idx}
          >
            {dateRange.label}
          </button>
        );
      })}
    </div>
  );
};
