import { FC } from 'react';
import SiteHeader, { SiteHeaderProps } from '../shared/SiteHeader';

interface RegularPageLayoutProps extends SiteHeaderProps {
  children: React.ReactNode;
}

const RegularPageLayout: FC<RegularPageLayoutProps> = ({
  children,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-8 pt-8 md:gap-16 md:pt-16">
      <SiteHeader {...props} />
      {children}
    </div>
  );
};

export default RegularPageLayout;
