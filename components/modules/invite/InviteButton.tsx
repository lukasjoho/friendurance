'use client';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  useModal,
} from '@/components/shared/modal';
import { Button, ButtonProps } from '@/components/ui/button';
import { useCopyToClipboard } from '@/lib/hooks/useCopyToClipboard';
import { cn } from '@/lib/utils';
import { CheckCircle2, Copy, CopyCheck, UserPlus2 } from 'lucide-react';
import { FC, useState } from 'react';
import toast from 'react-hot-toast';
import { createInvite } from './actions';

interface InviteButtonProps extends ButtonProps {}

const InviteButton: FC<InviteButtonProps> = (props) => {
  const { className, ...rest } = props;
  const { show } = useModal();
  return (
    <Button
      className={cn('flex gap-1.5', className)}
      variant="outline"
      size="md"
      onClick={() => show(<InviteModal />)}
    >
      <UserPlus2 className="h-5 w-5" />
      Invite
    </Button>
  );
};

export default InviteButton;

const InviteModal = () => {
  const [copiedText, copy] = useCopyToClipboard();
  const [invite, setInvite] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    setLoading(true);
    const res = await createInvite();
    console.log('RES', res);
    if (res.success) {
      setInvite(res.data.id);
    }
    setLoading(false);
  };

  const handleCopy = async () => {
    const isCopied = await copy(`https://friendurance.com/invite/${invite}`);
    if (isCopied) {
      toast.success('Copied to clipboard');
    } else {
      toast.error('Failed to copy to clipboard');
    }
  };
  return (
    <Modal className="md:max-w-[340px]">
      <ModalHeader>
        <div className="space-y-2">
          <ModalTitle>Invite</ModalTitle>
          <p className="text-muted-foreground">
            Invite a friend to your team by creating an invite link. Share the
            link and your friends will be able to join your team once signed up.
          </p>
        </div>
      </ModalHeader>
      <ModalContent className="space-y-2">
        <Button
          className={cn(
            'flex w-full gap-2',
            invite && 'bg-green-500 disabled:opacity-100'
          )}
          onClick={handleClick}
          disabled={invite || loading}
        >
          {!loading ? (
            invite ? (
              <>
                Link created <CheckCircle2 />
              </>
            ) : (
              <>Create invite link</>
            )
          ) : (
            'Creating link...'
          )}
        </Button>
        {invite && (
          <div className="flex w-full gap-2 ">
            <div className="flex h-12 shrink grow items-center justify-start overflow-scroll rounded-md border px-4">
              {`https://friendurance.com/invite/${invite}`}
            </div>

            <Button
              size="icon"
              variant={copiedText ? 'default' : 'secondary'}
              className="shrink-0"
              onClick={handleCopy}
            >
              {copiedText ? <CopyCheck /> : <Copy />}
            </Button>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};
