import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DateRangeSelector = () => {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Last 28 days</TabsTrigger>
        <TabsTrigger value="password">Last 365 days</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default DateRangeSelector;
