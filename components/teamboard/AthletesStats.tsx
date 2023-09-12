import UsersTable from '../leaderboard/UsersTable';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

const AthletesStats = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Athlete Stats</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="run" className="">
          <TabsList className="ml-6">
            <TabsTrigger value="run">Run</TabsTrigger>
            <TabsTrigger value="ride">Ride</TabsTrigger>
          </TabsList>
          <TabsContent value="run" className="w-full">
            <UsersTable discipline="Run" />
          </TabsContent>
          <TabsContent value="ride">
            <UsersTable discipline="Ride" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AthletesStats;