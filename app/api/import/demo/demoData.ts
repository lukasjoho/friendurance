const COUNT = 500;

function generateRandomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function generateRandomInt(min: number, max: number) {
  return Number(generateRandomFloat(min, max).toFixed(0));
}

function generateRandomDate(start: string, end: string) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const startTimestamp = startDate.getTime();
  const endTimestamp = endDate.getTime();
  const diff = endTimestamp - startTimestamp;
  const newTimestamp = startTimestamp + Math.random() * diff;
  return new Date(newTimestamp).toISOString();
}

function generateActivity(i: number) {
  const mTime = generateRandomInt(900, 3600);
  const dist = Number(generateRandomFloat(5000, 10000).toFixed(1));
  return {
    userId: 'demo-' + generateRandomInt(1, 6).toString(),
    type: ['Run', 'Ride'][generateRandomInt(0, 1)],
    startDate: generateRandomDate('2023-01-01', new Date().toISOString()),
    startLatLng: [
      Number(generateRandomFloat(-90, 90).toFixed(2)),
      Number(generateRandomFloat(-180, 180).toFixed(2)),
    ],
    distance: dist,
    movingTime: mTime,
    elapsedTime: mTime + 360,
    elevGain: generateRandomInt(0, 500),
    kudosCount: generateRandomInt(0, 30),
    averageSpeed: Number((dist / mTime).toFixed(4)),
    maxSpeed: Number(generateRandomFloat(0, 20).toFixed(2)),
    averageWatts: generateRandomInt(100, 500),
    kilojoules: generateRandomInt(0, 3000),
    photosCount: generateRandomInt(0, 5),
    isDemo: true,
  };
}

export function generateActivities(count: number) {
  const activities = [];
  for (let i = 0; i < count; i++) {
    activities.push(generateActivity(i));
  }
  return activities;
}

export const generateUsers = () => [
  {
    userId: 'demo-1',
    firstName: 'Lenny',
    lastName: 'Longstride',
    imageUrl: `https://res.cloudinary.com/dum2lqmke/image/upload/v1694622173/joho5829_Sporty_avatar_portrait_3d_render_style_face_happy_chil_2f87e97e-ba9f-49de-9a67-43091094b95a_sjbopa.png`,
    accessToken: null,
    refreshToken: null,
    teamSlug: 'friendurance-demo-team',
    hasConnected: true,
    isDemo: true,
  },
  {
    userId: 'demo-2',
    firstName: 'Dashawn',
    lastName: 'Sprintwell',
    imageUrl: `https://res.cloudinary.com/dum2lqmke/image/upload/v1694625263/joho5829_Sporty_avatar_arabic_male_portrait_3d_render_style_fac_1244c9ca-b33f-4c00-9264-8dec448036c9_vklfko.png`,
    accessToken: null,
    refreshToken: null,
    teamSlug: 'friendurance-demo-team',
    hasConnected: true,
    isDemo: true,
  },
  {
    userId: 'demo-3',
    firstName: 'Tara',
    lastName: 'Tara Trackstar',
    imageUrl: `https://res.cloudinary.com/dum2lqmke/image/upload/v1694625146/joho5829_Sporty_avatar_black_portrait_3d_render_style_face_happ_76f95dbe-39c5-4cc8-af84-b0d8b467e7c4_wqluzc.png`,
    accessToken: null,
    refreshToken: null,
    teamSlug: 'friendurance-demo-team',
    hasConnected: true,
    isDemo: true,
  },
  {
    userId: 'demo-4',
    firstName: 'Miles',
    lastName: "O'Runner",
    imageUrl: `https://res.cloudinary.com/dum2lqmke/image/upload/v1694622172/joho5829_Sporty_avatar_portrait_3d_render_face_happy_3a871119-1d98-4bcb-bd26-c70b79dc5d37_jcci4v.png`,
    accessToken: null,
    refreshToken: null,
    teamSlug: 'friendurance-demo-team',
    hasConnected: true,
    isDemo: true,
  },
  {
    userId: 'demo-5',
    firstName: 'Fiona',
    lastName: 'Fleetfoot',
    imageUrl: `https://res.cloudinary.com/dum2lqmke/image/upload/v1694622173/joho5829_Sporty_avatar_portrait_3d_render_style_face_happy_chil_ff84a672-8d3a-48ca-9104-8009da57416d_nlk2az.png`,
    accessToken: null,
    refreshToken: null,
    teamSlug: 'friendurance-demo-team',
    hasConnected: true,
    isDemo: true,
  },
  {
    userId: 'demo-6',
    firstName: 'Lucy',
    lastName: 'Lapalot',
    imageUrl: `https://res.cloudinary.com/dum2lqmke/image/upload/v1694622172/joho5829_Sporty_avatar_portrait_user_avatar_3d_render_face_happ_3bceebb3-a595-4bdc-95c8-1e78b6cdfef5_r7sscm.png`,
    accessToken: null,
    refreshToken: null,
    teamSlug: 'friendurance-demo-team',
    hasConnected: true,
    isDemo: true,
  },
];
