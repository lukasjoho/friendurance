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
        <div className="-ml-3 -mr-3 flex gap-4 overflow-scroll pl-3 pr-3 md:-ml-6 md:-mr-6 md:pl-6 md:pr-6">
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
