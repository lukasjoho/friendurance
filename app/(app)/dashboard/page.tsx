import Map from '@/components/Map/Map';
import UserShowcase from '@/components/UserShowcase';

const DashboardPage = async () => {
  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <UserShowcase />
      {/* <Heatmap values={values} /> */}
      <Map />
    </div>
  );
};

export default DashboardPage;
