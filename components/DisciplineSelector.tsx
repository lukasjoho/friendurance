'use client';
import { Discipline, disciplines } from '@/lib/data/disciplines';
import { useCookie } from '@/lib/hooks/useLocalStorage';
import { cn } from '@/lib/utils';
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
  const [rangeCookie, setRangeCookie] = useCookie('dateRange', 'last-month');
  const handleDateRangeSelection = (dateRange: any) => {
    setRangeCookie(dateRange.value);
    router.refresh();
  };

  return (
    <div className="inline-flex rounded-md bg-muted p-1 text-muted-foreground">
      {dateRanges.map((dateRange, idx) => {
        const isActive = rangeCookie === dateRange.value;
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
