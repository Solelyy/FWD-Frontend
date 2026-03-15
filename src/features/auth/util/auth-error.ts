type AuthErrorType= "default" | "locked" | "other";

const messages: Record<AuthErrorType, string> = {
    default: "Incorrect employee ID or password.",
    locked: "Maximum login attempts reached. Account locked for 15 minutes.",
    other: "Something went wrong. Please try again.",
}

export function getAuthError(type?: AuthErrorType) {
    return type && messages[type] ? messages[type] : messages.default;
}