import { NextResponse, type NextRequest } from "next/server";
import { forwardToBackend } from "@/lib/server/backend-proxy";
import {
  findCookieValue,
  setAuthCookies,
  SESSION_COOKIE_NAME,
  USER_COOKIE_NAME,
} from "@/features/auth/server/auth-cookie";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const { response, upstreamSetCookies, ok } = await forwardToBackend(request, {
    path: "/auth/login",
    sessionCookie: null,
  });

  // Failed logins keep their exact backend status and body, and set no cookies.
  if (!ok) return response;

  const sessionToken = findCookieValue(upstreamSetCookies, SESSION_COOKIE_NAME);
  const userValue = findCookieValue(upstreamSetCookies, USER_COOKIE_NAME);

  if (!sessionToken || !userValue) {
    return NextResponse.json(
      { message: "Login response is missing required session cookies." },
      { status: 502 },
    );
  }

  setAuthCookies(response, sessionToken, userValue);
  return response;
}
