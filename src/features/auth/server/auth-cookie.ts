import "server-only";

import type { NextResponse } from "next/server";

export const SESSION_COOKIE_NAME = "session_token";
export const USER_COOKIE_NAME = "user";

const AUTH_COOKIE_MAX_AGE_SECONDS = 86400;

type CookieAttributes = {
  httpOnly: boolean;
  secure: boolean;
  sameSite: "lax";
  path: "/";
  maxAge: number;
};

function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

export function getSessionCookieAttributes(): CookieAttributes {
  return {
    httpOnly: true,
    secure: isProduction(),
    sameSite: "lax",
    path: "/",
    maxAge: AUTH_COOKIE_MAX_AGE_SECONDS,
  };
}

export function getUserCookieAttributes(): CookieAttributes {
  return {
    httpOnly: false,
    secure: isProduction(),
    sameSite: "lax",
    path: "/",
    maxAge: AUTH_COOKIE_MAX_AGE_SECONDS,
  };
}

// Next's cookie API percent-encodes values. Pre-decode only when that round-trips
// exactly to the upstream wire value, so neither session_token nor user is
// double-encoded or otherwise changed.
function normalizeCookieValue(wireValue: string): string {
  try {
    const decoded = decodeURIComponent(wireValue);
    return encodeURIComponent(decoded) === wireValue ? decoded : wireValue;
  } catch {
    return wireValue;
  }
}

export function findCookieValue(setCookies: string[], name: string): string | undefined {
  for (const entry of setCookies) {
    const pair = entry.split(";", 1)[0] ?? "";
    const equals = pair.indexOf("=");
    if (equals <= 0) continue;
    if (pair.slice(0, equals).trim() !== name) continue;

    let value = pair.slice(equals + 1).trim();
    if (value.length >= 2 && value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }
    if (value) return value;
  }
  return undefined;
}

export function getSessionCookieHeader(headers: Headers): string | null {
  const raw = headers.get("cookie");
  if (!raw) return null;

  for (const part of raw.split(";")) {
    const equals = part.indexOf("=");
    if (equals <= 0) continue;
    if (part.slice(0, equals).trim() !== SESSION_COOKIE_NAME) continue;

    const value = part.slice(equals + 1).trim();
    return value ? `${SESSION_COOKIE_NAME}=${value}` : null;
  }
  return null;
}

export function setAuthCookies(response: NextResponse, sessionToken: string, userValue: string): void {
  response.cookies.set(SESSION_COOKIE_NAME, normalizeCookieValue(sessionToken), getSessionCookieAttributes());
  response.cookies.set(USER_COOKIE_NAME, normalizeCookieValue(userValue), getUserCookieAttributes());
}

export function clearAuthCookies(response: NextResponse): void {
  response.cookies.set({
    ...getSessionCookieAttributes(),
    name: SESSION_COOKIE_NAME,
    value: "",
    maxAge: 0,
  });
  response.cookies.set({
    ...getUserCookieAttributes(),
    name: USER_COOKIE_NAME,
    value: "",
    maxAge: 0,
  });
}
