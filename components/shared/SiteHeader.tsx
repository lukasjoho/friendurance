import { FC } from 'react';
import Container from '../Container';

export interface SiteHeaderProps {
  title: string;
  subtitle: string;
}

const SiteHeader: FC<SiteHeaderProps> = ({ title, subtitle }) => {
  return (
    <Container className="text-center">
      <h1 className="font-tungsten text-5xl">{title}</h1>
      <h2 className="text-muted-foreground">{subtitle}</h2>
    </Container>
  );
};

export default SiteHeader;
