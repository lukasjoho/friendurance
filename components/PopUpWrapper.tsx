import { hasActivitiesAndStats } from '@/lib/db';
import ImportDataPopUp from './ImportDataPopUp';

const PopUpWrapper = async () => {
  const user = await hasActivitiesAndStats();
  if (user) {
    return false;
  }
  return (
    <div>
      <ImportDataPopUp />
    </div>
  );
};

export default PopUpWrapper;
