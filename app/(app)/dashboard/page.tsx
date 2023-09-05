import Header from "@/components/Header";
import Heatmap from "@/components/Heatmap";
import ImportDataPopUp from "@/components/ImportDataPopUp";
import SimpleMap from "@/components/Map/GoogleMap";
import Map from "@/components/Map/Map";
import UserShowcase from "@/components/UserShowcase";
import { transformDate } from "@/lib/helpers";
import { cookies } from "next/headers";
import React from "react";

const DashboardPage = async () => {
  return (
    <div className="flex flex-col gap-4 md:gap-8">
      {/* <UserShowcase /> */}
      {/* <Heatmap values={values} /> */}
      <Map />
    </div>
  );
};

export default DashboardPage;
