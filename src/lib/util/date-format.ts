export function formatDateTime(dateString: string) {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
        month: "short",   // Mar
        day: "2-digit",   // 01
        year: "numeric",  // 2026
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });

    //example backend sends: 2026-03-01T23:00:00Z
    //result in ui: Mar 01, 2026, 11:00 PM
}

