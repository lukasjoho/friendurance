import { cookies } from "next/headers";
import { refreshTokens } from "./strava";

export const fetcher = async (url: string) => {
  const cookieStore = cookies();
  const accessTokenCookie = cookieStore.get("accessToken");
  const accessToken = accessTokenCookie?.value;
  try {
    const request = async (accessToken: string) => {
      console.log("FIRING REQUEST", accessToken);
      return await fetch(url, {
        headers: {
          Authorization: `Bearer ${String(accessToken)}`,
        },
      });
    };

    const data = await handleRequest(
      () => request(accessToken as string),
      accessToken as string
    );
    return [data, null];
  } catch (error) {
    return [null, error];
  }
};

const handleRequest = async (
  request: (token: string) => Promise<any>,
  accessToken: string
) => {
  try {
    const res = await request(accessToken);
    if (res.status === 401) {
      const { accessToken: newAccessToken } = await refreshTokens();
      console.log("NEW ACCESS TOKEN", newAccessToken);
      const res = await request(newAccessToken);
      console.log("NEW RES", res);

      return;
    }
    const data = await res.json();

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
