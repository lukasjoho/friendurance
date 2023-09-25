import { User } from 'lucide-react';
import { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';

interface ShoutoutCardProps {
  user: any;
  symbol: string;
  label: string;
  metric: number | null;
  annotation?: string;
  description: string;
}

const ShoutoutCard: FC<ShoutoutCardProps> = async ({
  user,
  label,
  symbol,
  metric,
  annotation,
  description,
}) => {
  return (
    <div className="flex min-w-[240px] flex-1 flex-col items-center overflow-hidden rounded-xl border">
      <div className="flex w-full flex-col items-center gap-1 bg-zinc-50 px-6 pb-10 pt-6">
        <div className="text-3xl">{symbol}</div>
        <div className="text-center">
          <h2 className="text-xl font-semibold">{label}</h2>
          <h5 className="whitespace-nowrap text-muted-foreground">
            {description}
          </h5>
        </div>
      </div>
      <div className="-mb-6 flex -translate-y-6 items-center gap-2 rounded-xl border bg-white px-3 py-2">
        <Avatar className="relative h-8 w-8 ">
          <AvatarImage src={user?.imageUrl || undefined} />

          <AvatarFallback>
            {user && user.firstName?.charAt(0) + '' + user.lastName?.charAt(0)}
            {!user && <User className="h-5 w-5 text-muted-foreground" />}
          </AvatarFallback>
        </Avatar>
        <h3 className="font-semibold">{user?.firstName ?? '-'}</h3>
      </div>
      <div className="flex gap-4 px-6 py-6">
        <div className="flex flex-col items-center">
          <h4 className="relative text-5xl font-semibold">
            {metric ?? '-'}

            <span className="absolute bottom-0.5 ml-0.5 text-sm">
              {annotation}
            </span>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default ShoutoutCard;
