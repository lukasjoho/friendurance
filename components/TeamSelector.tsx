'use client';
import { useWindowSize } from '@/lib/hooks/useWindowSize';
import { ChevronsUpDown, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import ToastBody from './ToastBody';
import CreateTeamForm from './shared/CreateTeamForm';
import {
  Modal,
  ModalContents,
  ModalOpenButton,
} from './shared/GlobalModal/Modal';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Skeleton } from './ui/skeleton';

const TeamSelector = () => {
  const { slug } = useParams();
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const getUserTeams = async () => {
      const res = await fetch('/api/current', {
        method: 'GET',
      });
      const data = await res.json();
      setUser(data);
    };
    getUserTeams();
  }, [slug]);
  const handleClick = () => {
    toast(
      <ToastBody
        title="You can't switch team channels yet!"
        message="Creating multiple team channels and switching between them will be coming soon."
      />
    );
  };
  let size = useWindowSize();

  return (
    <Modal>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
          <Button
            className="group flex items-center justify-start gap-1 text-sm outline-none focus:outline-none md:gap-2 md:text-base"
            variant="outline"
            size="sm"
            onClick={handleClick}
          >
            <div className="grid aspect-square h-4 w-4 shrink-0 place-items-center overflow-hidden rounded-md bg-muted text-xs font-semibold md:h-5 md:w-5 md:text-xs">
              {user?.currentTeam?.name[0]}
            </div>
            <div className="block w-12 max-w-[128px] overflow-hidden text-ellipsis whitespace-nowrap text-left md:w-auto">
              {user?.currentTeam?.name ?? (
                <Skeleton className="h-[20px] w-12 rounded-md" />
              )}
            </div>
            <ChevronsUpDown className="ml-auto h-4 w-4 text-muted-foreground group-hover:text-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel className="text-foreground">
            Teams
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {user?.teams?.map((team: any) => {
              return (
                <Link href={`/team/${team.slug}`} key={team.id}>
                  <DropdownMenuItem className="cursor-pointer">
                    <div className="flex gap-2">
                      <div className="grid aspect-square h-5 w-5 shrink-0 place-items-center rounded-md bg-muted text-xs font-semibold">
                        {team.name[0]}
                      </div>
                      <span>{team.name}</span>
                    </div>
                  </DropdownMenuItem>
                </Link>
              );
            })}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <ModalOpenButton>
            <DropdownMenuItem className="cursor-pointer">
              <div className="flex items-center gap-2">
                <div className="flex w-5 justify-center">
                  <PlusCircle className="h-4 w-4" />
                </div>
                <span>Create team</span>
              </div>
            </DropdownMenuItem>
          </ModalOpenButton>
        </DropdownMenuContent>
      </DropdownMenu>
      <ModalContents title="Create team" size={size} maxSize="sm">
        <CreateTeamForm />
      </ModalContents>
    </Modal>
  );
};

export default TeamSelector;
