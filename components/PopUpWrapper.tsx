import { hasActivitiesAndStats } from '@/lib/db';
import React from 'react';
import ImportDataPopUp from './ImportDataPopUp';

const PopUpWrapper = async () => {
  const user = await hasActivitiesAndStats();
  if (user) {
    return false;
  }
  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <ImportDataPopUp />
    </div>
  );
};

export default PopUpWrapper;
