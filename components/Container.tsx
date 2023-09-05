import React, { FC } from "react";

interface ContainerProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode | React.ReactNode[];
}

const Container: FC<ContainerProps> = ({ children }) => {
  return <div className="px-4 md:px-8 lg:px-16 xl:px-32">{children}</div>;
};

export default Container;
