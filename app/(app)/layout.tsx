import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ImportDataPopUp from "@/components/ImportDataPopUp";
import React, { FC } from "react";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col grow">
      <div className="mb-4 md:mb-8">
        <Header />
      </div>
      <div className="mb-4 md:mb-8">
        <ImportDataPopUp />
      </div>
      {children}
      <div className="mt-16 md:mt-32">
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
