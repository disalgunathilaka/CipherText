export function timeAgo(timestamp: number): string {
  const now = new Date().getTime() / 1000; // Convert to Unix time
  const secondsAgo = Math.floor(now - timestamp);

  if (secondsAgo < 60) {
    return secondsAgo + ' seconds ago';
  } else if (secondsAgo < 3600) {
    const minutesAgo = Math.floor(secondsAgo / 60);
    return minutesAgo + ' minutes ago';
  } else if (secondsAgo < 86400) {
    const hoursAgo = Math.floor(secondsAgo / 3600);
    return hoursAgo + ' hours ago';
  } else {
    const daysAgo = Math.floor(secondsAgo / 86400);
    return daysAgo + ' days ago';
  }
}

// Math.floor(new Date(message.createdAt).getTime() / 1000);
