import Container from './Container';
import { DateRangeSelector } from './DisciplineSelector';
import TeamSelector from './TeamSelector';

const TeamspaceHeader = () => {
  return (
    <div className="sticky top-0 z-10 -mb-4 mt-4 bg-white py-4">
      <Container className="flex justify-between">
        <TeamSelector />
        <DateRangeSelector />
      </Container>
    </div>
  );
};

export default TeamspaceHeader;
