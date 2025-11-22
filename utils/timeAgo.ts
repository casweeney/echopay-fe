export function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals: { [key: string]: number } = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  if (seconds < 10) return "just now";
  if (seconds < 60) return `${seconds} seconds ago`;

  for (const key in intervals) {
    const interval = Math.floor(seconds / intervals[key]);
    if (interval >= 1) {
      return `${interval} ${key}${interval > 1 ? "s" : ""} ago`;
    }
  }

  // Fallback to actual formatted date
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }); // e.g "Nov 13, 2025"
}
