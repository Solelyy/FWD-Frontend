import type { NextRequest } from "next/server";
import { forwardToBackend } from "@/lib/server/backend-proxy";
import { clearAuthCookies, getSessionCookieHeader } from "@/features/auth/server/auth-cookie";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const { response } = await forwardToBackend(request, {
    path: "/auth/logout",
    sessionCookie: getSessionCookieHeader(request.headers),
  });

  // Clear locally regardless of backend outcome; no server-side revocation is implied.
  clearAuthCookies(response);
  return response;
}
