import Header from "@/components/Header";
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
  return (
    <div>
      <Header />
      <pre>ACCESS TOKEN: {JSON.stringify(accessTokenCookie, null, 2)}</pre>
      <pre>DATA: {JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default DashboardPage;
