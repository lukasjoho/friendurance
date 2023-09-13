import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import RadarChart from './RadarChart';

const TeamRadar = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Team Radar</CardTitle>
        <CardDescription>
          Performance percentile against other teams.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadarChart />
      </CardContent>
    </Card>
  );
};

export default TeamRadar;
