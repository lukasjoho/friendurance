import { UserAvatar } from '@/components/shared/UserAvatar';
import { User } from '@/lib/types';

interface MarkerProps {
  lat: any;
  lng: any;
  data: {
    lat: any;
    lng: any;
    user: Pick<User, 'firstName' | 'lastName' | 'imageUrl'>;
  };
}

const Marker = ({ data }: MarkerProps) => {
  const { user } = data;
  return (
    <div className="relative flex aspect-square h-6 w-6 items-center justify-center rounded-full bg-brand transition duration-150 hover:z-10 hover:scale-[2]">
      <UserAvatar className="h-5 w-5" user={user} />
    </div>
  );
};

export default Marker;
