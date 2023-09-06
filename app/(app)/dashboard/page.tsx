import Container from '@/components/Container';
import Map from '@/components/Map/Map';
import TeamSummary from '@/components/TeamSummary';
import UserShowcase from '@/components/UserShowcase';

const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <Container>
        <div className="flex flex-col gap-4 md:flex-row md:gap-8">
          <UserShowcase />
          <TeamSummary />
        </div>
      </Container>
      <Map />
    </div>
  );
};

export default DashboardPage;
