export function formatDateTime(data: string) {
  const date = new Date(data);

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDateTime;
}

export function validateAndFormatTime(time: string): string | null {
  const timeRegex = /^(\d{1,2}):([0-5]?\d):([0-5]?\d)$/;

  const match = time.match(timeRegex);

  if (!match) {
    return null;
  }

  let [hours, minutes, seconds] = match.slice(1, 4);

  hours = hours.padStart(2, "0");
  minutes = minutes.padStart(2, "0");
  seconds = seconds.padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

export function formatTime(time: string) {
  const dateTime = new Date(time);
  const hours = String(dateTime.getUTCHours()).padStart(2, "0");
  const minutes = String(dateTime.getUTCMinutes()).padStart(2, "0");
  const seconds = String(dateTime.getUTCSeconds()).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

export function formatWeight(weight: number): number | string {
  if (weight <= 0) {
    return weight;
  } else {
    return `+ ${weight}`;
  }
}
