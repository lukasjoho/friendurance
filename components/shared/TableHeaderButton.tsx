import { MoveDown } from 'lucide-react';
import { Button } from '../ui/button';

const TableHeaderButton = ({ children, column }: any) => {
  return (
    <Button
      variant="superghost"
      onClick={() => column.toggleSorting(true)}
      className="-ml-4"
    >
      {children}
      <MoveDown className="ml-0.5 h-4 w-4" />
    </Button>
  );
};

export default TableHeaderButton;
