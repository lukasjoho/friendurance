import { cookies } from 'next/headers';

export function setTokens(accessToken: string, refreshToken: string) {
  cookies().set('accessToken', accessToken);
  cookies().set('refreshToken', refreshToken);
}
