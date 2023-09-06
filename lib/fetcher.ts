import { cookies } from "next/headers";
import { refreshTokens } from "./strava";

export const fetcher = async (url: string) => {
  const cookieStore = cookies();
  const accessTokenCookie = cookieStore.get("accessToken");
  const accessToken = accessTokenCookie?.value;
  console.log("ACCESS TOOOsKEN: ", accessToken);
  try {
    const request = (accessToken: string) => async () => {
      return await fetch(url, {
        headers: {
          Authorization: `Bearer ${String(accessToken)}`,
        },
      });
    };

    const data = await handleRequest(request, accessToken as string);
    return [data, null];
  } catch (error) {
    return [null, error];
  }
};

const handleRequest = async (
  requestGenerator: (token: string) => () => Promise<any>,
  accessToken: string
) => {
  try {
    const res = await requestGenerator(accessToken)();
    if (res.status === 401) {
      const { accessToken: newAccessToken } = await refreshTokens();
      const res = await requestGenerator(newAccessToken)();
      const data = await res.json();
      return data;
    }
    const data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
