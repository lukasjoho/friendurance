import RadarChart from './RadarChart';

const Radar = ({ metrics }: any) => {
  const runMetrics = metrics.run;
  const rideMetrics = metrics.ride;
  const dataset1 = Object.keys(runMetrics).map((key) => {
    return runMetrics[key];
  });
  const dataset2 = Object.keys(rideMetrics).map((key) => {
    return rideMetrics[key];
  });

  return (
    <div>
      <RadarChart dataset1={dataset1} dataset2={dataset2} />
    </div>
  );
};

export default Radar;
