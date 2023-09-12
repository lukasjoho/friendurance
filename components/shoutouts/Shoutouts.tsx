import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import Climber from './Climber';
import Explorer from './Explorer';
import FlashRunner from './FlashRunner';
import Grinder from './Grinder';
import Hustler from './Hustler';
import LightningCyclist from './LightningCyclist';

const Shoutouts = ({ slug }: { slug: string }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Shoutouts</CardTitle>
        <CardDescription>High-performers in last 30 days.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="-ml-6 -mr-6 flex gap-4 overflow-scroll pl-6 pr-6">
          <Hustler slug={slug} />
          <Climber slug={slug} />
          <Grinder slug={slug} />
          <LightningCyclist slug={slug} />
          <FlashRunner slug={slug} />
          <Explorer slug={slug} />
        </div>
      </CardContent>
    </Card>
  );
};

export default Shoutouts;
