import { getAuthUser } from '@/lib/db';
import { ChevronsUpDown } from 'lucide-react';
import Link from 'next/link';
import { TeamAvatar } from '../../../shared/UserAvatar';
import { Button } from '../../../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../ui/dropdown-menu';
import CreateTeamFromDropdown from './CreateTeamFromDropdown';

const TeamSelector = async ({ slug }: any) => {
  const user = await getAuthUser();

  const currentTeam = user?.teams?.find((team: any) => team.slug === slug);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
        <Button
          className="group flex items-center justify-start gap-1 text-sm outline-none focus:outline-none md:gap-2 md:text-base"
          variant="outline"
          size="md"
        >
          <TeamAvatar
            team={currentTeam}
            className="h-5 w-5 rounded-md text-xs"
          />
          <div className="block w-12 max-w-[128px] overflow-hidden text-ellipsis whitespace-nowrap text-left md:w-auto">
            {currentTeam?.name}
          </div>
          {/* <div className="grid aspect-square h-4 w-4 shrink-0 place-items-center overflow-hidden rounded-md bg-muted text-xs font-semibold md:h-5 md:w-5 md:text-xs">
            {currentTeam?.name[0]}
          </div>
          <div className="block w-12 max-w-[128px] overflow-hidden text-ellipsis whitespace-nowrap text-left md:w-auto">
            {currentTeam?.name ?? (
              <Skeleton className="h-[20px] w-12 rounded-md" />
            )}
          </div> */}
          <ChevronsUpDown className="ml-auto h-4 w-4 text-muted-foreground group-hover:text-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="text-foreground">Teams</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {user?.teams?.map((team: any) => {
            return (
              <Link href={`/team/${team.slug}`} key={team.id}>
                <DropdownMenuItem className="cursor-pointer">
                  <div className="flex gap-2">
                    <TeamAvatar
                      team={team}
                      className="h-5 w-5 rounded-md text-xs"
                    />
                    <span>{team.name}</span>
                  </div>
                </DropdownMenuItem>
              </Link>
            );
          })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <CreateTeamFromDropdown />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TeamSelector;
