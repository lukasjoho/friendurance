import { FC } from 'react';

interface ToastBodyProps {
  title: string;
  message?: string;
}

const ToastBody: FC<ToastBodyProps> = ({ title, message }) => {
  return (
    <div>
      <p className="font-semibold">{title}</p>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ToastBody;
