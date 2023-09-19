import { CardTitle } from '@/components/ui/card';
import RadarChart from './RadarChart';

const Radar = ({ data }: any) => {
  const runValues = Object.values(data.run);
  const rideValues = Object.values(data.ride);

  return (
    <div>
      <CardTitle className="text-center">Percentile Radar</CardTitle>
      <div className="w-[340px]">
        <RadarChart dataset1={runValues} dataset2={rideValues} />
      </div>
    </div>
  );
};

export default Radar;
