type TimeDifference = {
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  months: number;
};

function getTimeDifference(timestamp: string | Date): TimeDifference {
  const now = new Date();
  const notificationTime = new Date(timestamp);
  const differenceInMs = now.getTime() - notificationTime.getTime();

  const seconds = Math.floor(differenceInMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30); // Approximation for months

  return { seconds, minutes, hours, days, months };
}

export function formatTimeDifference(timestamp: string | Date): string {
  const { seconds, minutes, hours, days, months } =
    getTimeDifference(timestamp);

  if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  }
}
