import React, { FC } from "react";

interface ToastBodyProps {
  title: string;
  message?: string;
}

const ToastBody: FC<ToastBodyProps> = ({ title, message }) => {
  return (
    <div>
      <p>{title}</p>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ToastBody;
