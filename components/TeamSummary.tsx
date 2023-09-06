import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { prisma } from '@/lib/prisma';
import { FC } from 'react';
import { metersToKilometers } from './UserShowcase';

const TeamSummary = async () => {
  const run = await prisma.activity.aggregate({
    _avg: {
      distance: true,
    },
    _sum: {
      distance: true,
    },
    where: {
      startDate: {
        gte: new Date(new Date().getTime() - 28 * 24 * 60 * 60 * 1000),
      },
      type: {
        equals: 'Run',
      },
    },
  });
  const bike = await prisma.activity.aggregate({
    _avg: {
      distance: true,
    },
    _sum: {
      distance: true,
    },
    where: {
      startDate: {
        gte: new Date(new Date().getTime() - 28 * 24 * 60 * 60 * 1000),
      },
      type: {
        equals: 'Ride',
      },
    },
  });
  return (
    <Card className="ml-auto w-full shrink-0 rounded-xl md:w-auto">
      <CardHeader>
        <CardTitle className="text-xl">Team Summary</CardTitle>
        <CardDescription>Last month aggregate activities.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-12">
          <div className="space-y-4">
            <h3 className=" border-b pb-2 font-semibold">🏃 Running</h3>
            <div className="grid grid-cols-2 gap-4">
              <Metric
                label="Avg"
                value={run._avg.distance}
                annotation="km/run"
              />
              <Metric label="Total" value={run._sum.distance} annotation="km" />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className=" border-b pb-2 font-semibold">🚴 Biking</h3>
            <div className="grid grid-cols-2 gap-4">
              <Metric
                label="Avg"
                value={bike._avg.distance}
                annotation="km/ride"
              />
              <Metric
                label="Total"
                value={bike._sum.distance}
                annotation="km"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamSummary;

interface MetricProps {
  label: string;
  value: number | null | undefined;
  annotation: string;
}

const Metric: FC<MetricProps> = ({ label, value, annotation }) => {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="text-2xl font-semibold">
        {metersToKilometers(value)}
        <span className="text-sm font-normal"> {annotation}</span>
      </p>
    </div>
  );
};
