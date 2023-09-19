import { CardTitle } from '@/components/ui/card';
import RadarChart from './RadarChart';

const Radar = ({ data }: any) => {
  const runValues = Object.values(data.run);
  const rideValues = Object.values(data.ride);

  return (
    <div>
      <CardTitle className="text-center">Percentile Radar</CardTitle>

      <div className="relative w-full md:w-[340px]">
        <div className="absolute left-0 top-0 mt-6 flex flex-col justify-start gap-0.5 text-sm">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-brand" />
            Run
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-indigo-500" />
            Ride
          </div>
        </div>
        <RadarChart dataset1={runValues} dataset2={rideValues} />
      </div>
    </div>
  );
};

export default Radar;
