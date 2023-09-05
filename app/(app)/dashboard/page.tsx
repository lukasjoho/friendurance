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
  const cookieStore = cookies();
  const accessTokenCookie = cookieStore.get("accesstoken");
  const res = await fetch(`https://www.strava.com/api/v3/athlete/activities`, {
    headers: {
      Authorization: `Bearer ${accessTokenCookie?.value}`,
    },
  });
  const data = await res.json();

  const resUser = await fetch(`https://www.strava.com/api/v3/athlete`, {
    headers: {
      Authorization: `Bearer ${accessTokenCookie?.value}`,
    },
  });
  const dataUser = await resUser.json();

  const values = data.map((activity: any) => ({
    date: transformDate(activity.start_date_local),
    count: activity.moving_time,
  }));
  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <UserShowcase />
      {/* <Heatmap values={values} /> */}
      <Map />
    </div>
  );
};

export default DashboardPage;
