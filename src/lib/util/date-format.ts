export function formatDateTime(dateString?: string |null) {
  if (!dateString) return "-"
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

export function getTodayFormatted() {
  const now = new Date();
  return now.toLocaleDateString("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });
}

export function getMonthYear(date?: string | Date | null) {
  if (!date) return "-";

  const parsed = typeof date === "string" ? new Date(date) : date;

  if (isNaN(parsed.getTime())) {
    return "Invalid Date";
  }

  return parsed.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export function formatTime(dateString?: string | null, 
  options?: {isLate?: boolean; isUndertime?: boolean }
) {
  if (!dateString) return "No record yet";

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  let suffix = "";
  if (options?.isLate) suffix = " (Late)";
  if (options?.isUndertime) suffix = " (Undertime)";

  return time + suffix;
}