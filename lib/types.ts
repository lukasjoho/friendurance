export interface User {
  id: string;
  userId: string;
  createdAt: Date;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string | null;
  userStats: UserStats | null;
}

export interface StravaActivity {
  distance?: number;
  moving_time?: number;
  type?: string;
  start_date?: string;
}

export interface UserStats {
  recentRunDistance: number;
  recentSwimDistance: number;
  recentRideDistance: number;
}
