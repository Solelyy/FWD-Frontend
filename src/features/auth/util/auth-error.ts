type AuthErrorType= "default" | "locked" | "other" | "blocked";

const messages: Record<AuthErrorType, string> = {
    default: "Incorrect employee ID or password.",
    locked: "Maximum login attempts reached. Account is locked for 15 minutes.",
    blocked: "Account restricted. Please contact the admin/hr.",
    other: "Something went wrong. Please try again.",
}

export function getAuthError(type?: AuthErrorType) {
    return type && messages[type] ? messages[type] : messages.default;
}