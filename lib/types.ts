export interface Athlete {
  id: string;
  athleteId: string;
  createdAt: Date;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string | null;
}

export interface StravaActivity {
  distance?: number;
  moving_time?: number;
  type?: string;
  start_date?: string;
}
