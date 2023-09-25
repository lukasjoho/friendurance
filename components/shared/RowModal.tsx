import Radar from '../modules/radar';
import TeamInfoModal from '../pages/leaderboard/TeamInfoModal';
import UserInfoModal from './UserInfoModal';

const RowModal = ({ data, type }: any) => {
  if (type === 'team') {
    return <TeamInfoModal data={data} />;
  }
  if (type === 'user') {
    return <UserInfoModal data={data} radar={<Radar />} />;
  }
  return;
};

export default RowModal;
