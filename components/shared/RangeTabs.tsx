'use client';
import { useCookie } from '@/lib/hooks/useLocalStorage';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import { FC } from 'react';

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

export const RangeTabs: FC<any> = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [rangeCookie, setRangeCookie] = useCookie('dateRange', 'last-month');
  const handleRangeSelection = (dateRange: any) => {
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
            onClick={() => handleRangeSelection(dateRange)}
            key={idx}
          >
            {dateRange.value}
          </button>
        );
      })}
    </div>
  );
};
