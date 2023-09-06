import React from 'react';
import Container from './Container';
import { Icons } from './Icons';

const Header = async () => {
  return (
    <div className="flex h-14 w-full items-center border-b ">
      <Container>
        <Icons.logo className="h-5" />
      </Container>
    </div>
  );
};

export default Header;
