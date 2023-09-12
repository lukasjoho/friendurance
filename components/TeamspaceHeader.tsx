import Container from './Container';
import { DateRangeSelector } from './DisciplineSelector';
import TeamSelector from './TeamSelector';

const TeamspaceHeader = () => {
  return (
    <div className="mt-2 h-10 md:mt-4">
      <Container className="flex justify-between">
        <TeamSelector />
        <DateRangeSelector />
      </Container>
    </div>
  );
};

export default TeamspaceHeader;
