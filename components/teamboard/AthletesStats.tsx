import UsersTable from '../leaderboard/UsersTable';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

const AthletesStats = ({ slug }: { slug: string }) => {
  return (
    <Card className="grow overflow-hidden">
      <CardHeader>
        <CardTitle>Athlete Stats</CardTitle>
      </CardHeader>
      <CardContent className="p-0 pt-1 md:p-0">
        <Tabs defaultValue="run">
          <TabsList className="ml-3 md:ml-6">
            <TabsTrigger value="run">Run</TabsTrigger>
            <TabsTrigger value="ride">Ride</TabsTrigger>
          </TabsList>
          <TabsContent value="run">
            <UsersTable discipline="Run" slug={slug} />
          </TabsContent>
          <TabsContent value="ride">
            <UsersTable discipline="Ride" slug={slug} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AthletesStats;
