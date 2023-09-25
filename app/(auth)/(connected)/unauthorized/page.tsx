import Container from '@/components/layout/Container';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

const UnauthorizedPage = () => {
  return (
    <Container>
      <AlertDestructive />
    </Container>
  );
};

export default UnauthorizedPage;

const AlertDestructive = () => {
  return (
    <Alert variant="destructive" className="w-auto">
      <AlertCircle className="h-4 w-4" />
      <div className="space-y-6">
        <div>
          <AlertTitle>No team access</AlertTitle>
          <AlertDescription>
            You do not have access to this team
          </AlertDescription>
        </div>
        <Link href="/teams" className={cn(buttonVariants())}>
          View my teams
        </Link>
      </div>
    </Alert>
  );
};
