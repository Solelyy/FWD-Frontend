export function formatDateTime(dateString: string) {
  // Remove the weekday and 'at'
  const cleaned = dateString.replace(/^\w+, /, "").replace(" at ", " ");
  const date = new Date(cleaned);

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}