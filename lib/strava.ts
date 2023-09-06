import { cookies } from 'next/headers';
import { setTokens } from './tokens';
import { fetcher } from './fetcher';

export interface TokenResponse {
  token_type: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  access_token: string;
}

export async function getTokens(code: string): Promise<TokenResponse> {
  const clientId = process.env.STRAVA_CLIENT_ID;
  const clientSecret = process.env.STRAVA_CLIENT_SECRET;
  const grantType = 'authorization_code';
  const tokenUrl = `https://www.strava.com/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}&grant_type=${grantType}`;
  const res = await fetch(tokenUrl, {
    method: 'POST',
  });
  const data = await res.json();
  return data;
}

export async function refreshTokens() {
  const cookieStore = cookies();
  const refreshTokenCookie = cookieStore.get('refreshToken');
  const refreshToken = refreshTokenCookie?.value;
  if (!refreshToken) {
    throw new Error('No refresh token');
  }
  const grantType = 'refresh_token';
  const tokenUrl = `https://www.strava.com/oauth/token?client_id=${process.env.STRAVA_CLIENT_ID}&client_secret=${process.env.STRAVA_CLIENT_SECRET}&grant_type=${grantType}&refresh_token=${refreshToken}`;
  const res = await fetch(tokenUrl, {
    method: 'POST',
  });
  const data = await res.json();
  setTokens(data.access_token, data.refresh_token);
  return { accessToken: data.access_token, refreshToken: data.refresh_token };
}

export async function getStravaUser() {
  const [data, error] = await fetcher(`${process.env.STRAVA_API_URL}/athlete`);
  console.log('STRAVAAASSS: ', error);

  return data;
}
