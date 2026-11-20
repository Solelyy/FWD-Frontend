import { NextResponse, type NextRequest } from "next/server";
import { forwardToBackend, resolveBackendPath } from "@/lib/server/backend-proxy";
import { getSessionCookieHeader } from "@/features/auth/server/auth-cookie";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UNAUTHENTICATED_BACKEND_PATHS = new Set([
  "/auth/validate-token",
  "/auth/set-password",
]);

type RouteContext = { params: Promise<{ path: string[] }> };

async function handle(request: NextRequest, context: RouteContext) {
  const { path: segments } = await context.params;
  const path = resolveBackendPath(segments);
  if (!path) {
    return NextResponse.json({ message: "Unsupported API path." }, { status: 400 });
  }

  const sessionCookie = UNAUTHENTICATED_BACKEND_PATHS.has(path)
    ? null
    : getSessionCookieHeader(request.headers);

  const { response } = await forwardToBackend(request, { path, sessionCookie });
  return response;
}

export async function GET(request: NextRequest, context: RouteContext) {
  return handle(request, context);
}

export async function POST(request: NextRequest, context: RouteContext) {
  return handle(request, context);
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  return handle(request, context);
}

export async function PUT(request: NextRequest, context: RouteContext) {
  return handle(request, context);
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  return handle(request, context);
}

export async function HEAD(request: NextRequest, context: RouteContext) {
  return handle(request, context);
}
