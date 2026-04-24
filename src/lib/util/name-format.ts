export function fullName(firstname: string, lastname: string) {
    return `${firstname} ${lastname}`
}

export function greetingText(firstname?: string | null, fallback = "Employee") {
    return `Good Day, ${firstname ?? fallback}!`;
}