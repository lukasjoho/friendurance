import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ImportDataPopUp from "@/components/ImportDataPopUp";
import PopUpWrapper from "@/components/PopUpWrapper";
import React, { FC } from "react";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col grow gap-4 md:gap-8">
      <Header />
      <PopUpWrapper />
      {children}
      <div className="mt-16 md:mt-32">
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
