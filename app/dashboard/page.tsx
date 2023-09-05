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
    <div>
      <ImportDataPopUp />
      <UserShowcase />
      <Heatmap values={values} />
      <Map />
      <pre>USER: {JSON.stringify(dataUser, null, 2)}</pre>
      <pre>ACCESS TOKEN: {JSON.stringify(accessTokenCookie, null, 2)}</pre>
      <pre>DATA: {JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default DashboardPage;
