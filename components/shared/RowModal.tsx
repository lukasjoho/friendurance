import TeamInfoModal from '../TeamInfoModal';
import Radar from '../modules/radar';
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
