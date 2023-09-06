import { getServerUser } from "@/lib/fetcher";
import React from "react";

const page = async () => {
  const user = await getServerUser();
  return <div>{JSON.stringify(user, null, 2)}</div>;
};

export default page;
