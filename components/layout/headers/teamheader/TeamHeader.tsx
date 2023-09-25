import { ModuleProps } from '@/lib/types';
import InviteButton from '../../../modules/invite/InviteButton';
import { DateRangeSelector } from '../../../pages/leaderboard/DisciplineSelector';
import Container from '../../Container';
import TeamSelector from './TeamSelector';

interface TeamHeaderProps extends ModuleProps {}

const TeamHeader = ({ slug }: TeamHeaderProps) => {
  return (
    <div className="relative top-0 z-10 mt-3 bg-white  md:mt-8">
      <Container className="space-y-1.5 md:space-y-4">
        <div className="flex items-center justify-between">
          {slug !== 'friendurance-demo-team' && <TeamSelector slug={slug} />}
          <div className="flex gap-2">
            {slug !== 'friendurance-demo-team' && (
              <div className="hidden md:block">
                <InviteButton />
              </div>
            )}
            <DateRangeSelector />
          </div>
        </div>
        {slug !== 'friendurance-demo-team' && (
          <div className="md:hidden">
            <InviteButton className="w-full" />
          </div>
        )}
      </Container>
    </div>
  );
};

export default TeamHeader;
