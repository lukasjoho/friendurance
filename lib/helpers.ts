export function transformDate(dateStr: string) {
  const date = new Date(dateStr);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // months start from 0 in JS
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${year}/${month}/${day}`;
}

export function secondsToHoursMinutes(seconds: number) {
  if (!seconds) return "0min";
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}min`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else {
    return `${minutes}min`;
  }
}
