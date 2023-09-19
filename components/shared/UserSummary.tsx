'use client';
import { dateRanges } from '@/lib/data/dateRanges';
import { disciplines } from '@/lib/data/disciplines';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface UserSummaryProps {
  views: {
    run: {
      lastMonth: React.ReactNode;
      lastYear: React.ReactNode;
    };
    ride: {
      lastMonth: React.ReactNode;
      lastYear: React.ReactNode;
    };
  };
}

const UserSummary = ({ views }: UserSummaryProps) => {
  const [selection, setSelection] = useState({
    type: 'Run',
    range: 'last-month',
  });
  const handleDisciplineClick = (range: any) => {
    setSelection({
      ...selection,
      type: range.dbType,
    });
  };
  const handleClick = (range: any) => {
    setSelection({
      ...selection,
      range: range.value,
    });
  };
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="inline-flex rounded-md bg-muted p-1 text-muted-foreground">
          {disciplines.map((discipline, idx) => {
            const isActive = selection.type === discipline.dbType;
            return (
              <button
                className={cn(
                  'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-2 py-1 text-xs font-medium',
                  isActive && 'bg-background text-foreground shadow-sm'
                )}
                onClick={() => handleDisciplineClick(discipline)}
                key={idx}
              >
                {discipline.dbType}
              </button>
            );
          })}
        </div>
        <div className="inline-flex rounded-md bg-muted p-1 text-muted-foreground">
          {dateRanges.map((dateRange, idx) => {
            const isActive = selection.range === dateRange.value;
            return (
              <button
                className={cn(
                  'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-2 py-1 text-xs font-medium',
                  isActive && 'bg-background text-foreground shadow-sm'
                )}
                onClick={() => handleClick(dateRange)}
                key={idx}
              >
                {dateRange.label}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        {selection.type === 'Run' &&
          selection.range === 'last-month' &&
          views.run.lastMonth}
        {selection.type === 'Run' &&
          selection.range === 'last-year' &&
          views.run.lastYear}
        {selection.type === 'Ride' &&
          selection.range === 'last-month' &&
          views.ride.lastMonth}
        {selection.type === 'Ride' &&
          selection.range === 'last-year' &&
          views.ride.lastYear}
      </div>
    </div>
  );
};

export default UserSummary;
