'use client';

import { useParams, usePathname } from 'next/navigation';
import { useEffect } from 'react';

const CurrentTeamSetter = ({ user }: any) => {
  const { userId } = user;
  const path = usePathname();
  const { slug }: any = useParams();

  //same name as name of your file, can be [slug].js; [specialId].js - any name you want
  useEffect(() => {
    const setTeam = async () => {
      const res = await fetch('/api/current', {
        method: 'PUT',
        body: JSON.stringify({ slug, userId }),
      });
    };
    setTeam();
  }, []);
  return <></>;
};

export default CurrentTeamSetter;
