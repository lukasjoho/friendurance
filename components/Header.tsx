import React from "react";
import Container from "./Container";
import { Icons } from "./Icons";

const Header = () => {
  return (
    <div className="w-full h-14 flex items-center border-b">
      <Container>
        <Icons.logo className="h-5" />
      </Container>
    </div>
  );
};

export default Header;
