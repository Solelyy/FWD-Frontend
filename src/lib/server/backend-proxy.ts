import "server-only";

import { NextResponse, type NextRequest } from "next/server";

// All requests are server-to-server. The browser never supplies a destination host.
const BACKEND_TIMEOUT_MS = 60_000;

// Only backend API prefixes confirmed by the existing frontend API inventory are allowed.
const ALLOWED_PATH_PREFIXES = [
  "/auth/",
  "/employee/",
  "/admin/",
  "/superadmin/",
  "/users/",
] as const;

// Hop-by-hop headers must not be passed between the browser and the backend.
// Set-Cookie is deliberately dropped: the frontend owns the browser-facing cookies.
const STRIPPED_RESPONSE_HEADERS = new Set([
  "set-cookie",
  "host",
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
  "content-length",
  "content-encoding",
]);

// Inventory check: existing API functions only set Content-Type (JSON, or the
// browser-generated multipart boundary). Accept is preserved for completeness.
// Cookie is rebuilt from the single frontend session cookie below.
const FORWARDED_REQUEST_HEADERS = ["content-type", "accept"] as const;

const METHODS_WITH_BODY = new Set(["POST", "PUT", "PATCH", "DELETE"]);
const METHODS_WITH_CSRF_CHECK = new Set(["POST", "PUT", "PATCH", "DELETE"]);

/**
 * The frontend's own origins must come from trusted configuration. They are
 * deliberately NOT derived from Host / X-Forwarded-Host, both of which a client
 * can influence. APP_ORIGIN accepts an exact comma-separated list; VERCEL_URL
 * is a platform-provided fallback for preview deployments.
 */
function getAllowedFrontendOrigins(request: NextRequest): string[] {
  const configured = process.env.APP_ORIGIN;
  if (configured) {
    return configured
      .split(",")
      .map((origin) => origin.trim().replace(/\/+$/, ""))
      .filter(Boolean);
  }

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) return [`https://${vercelUrl}`];

  // Local development only, and only for loopback hosts. Never used in production.
  if (process.env.NODE_ENV !== "production") {
    const origin = request.nextUrl.origin;
    try {
      const hostname = new URL(origin).hostname;
      if (hostname === "localhost" || hostname === "127.0.0.1" || hostname === "[::1]") {
        return [origin];
      }
    } catch {
      // fall through to fail closed
    }
  }

  return [];
}

function isAllowedBrowserMutation(request: NextRequest): boolean {
  const allowedOrigins = getAllowedFrontendOrigins(request);

  const origin = request.headers.get("origin");
  if (origin && !allowedOrigins.includes(origin)) return false;

  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite === "cross-site" || fetchSite === "same-site") return false;

  // No browser security headers: local tooling or server-to-server request.
  return true;
}

export type ForwardOptions = {
  /** Validated backend path, beginning with "/" (e.g. "/auth/login"). */
  path: string;
  /** Raw session cookie header value to forward, or null for unauthenticated calls. */
  sessionCookie?: string | null;
};

export type ForwardResult = {
  /** Sanitized response that is safe to return directly to the browser. */
  response: NextResponse;
  /** Set-Cookie values received from the backend; never forwarded by this module. */
  upstreamSetCookies: string[];
  ok: boolean;
  status: number;
};

function errorResponse(status: number, message: string): NextResponse {
  return NextResponse.json({ message }, { status });
}

/**
 * Resolve and validate a catch-all route segment list into a backend path.
 * Returns null for absolute URLs, protocol-relative URLs, traversal attempts,
 * malformed segments and unsupported API prefixes.
 */
export function resolveBackendPath(segments: string[] | undefined): string | null {
  if (!segments || segments.length === 0) return null;

  for (const segment of segments) {
    if (
      segment.length === 0 ||
      segment === "." ||
      segment === ".." ||
      segment.includes("..") ||
      segment.includes("/") ||
      segment.includes("\\") ||
      segment.includes("\0") ||
      /^[a-z][a-z\d+.-]*:/i.test(segment)
    ) {
      return null;
    }

    let decoded: string;
    try {
      decoded = decodeURIComponent(segment);
    } catch {
      return null;
    }

    if (
      decoded.includes("/") ||
      decoded.includes("\\") ||
      decoded.includes("..") ||
      decoded.includes("\0")
    ) {
      return null;
    }
  }

  const pathname = `/${segments.join("/")}`;
  if (!ALLOWED_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return null;
  }

  return pathname;
}

/**
 * API_URL must be a plain HTTP/HTTPS backend origin: no embedded credentials,
 * query string or fragment. Those would otherwise leak to the backend or make
 * the effective destination depend on attacker-influenced input.
 */
function getBackendBaseUrl(): string | null {
  const baseUrl = process.env.API_URL;
  if (!baseUrl) return null;

  let parsed: URL;
  try {
    parsed = new URL(baseUrl);
  } catch {
    return null;
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null;
  if (parsed.username || parsed.password) return null;
  if (parsed.search || parsed.hash) return null;
  if (!parsed.hostname) return null;

  return baseUrl.replace(/\/+$/, "");
}

function getRawSearch(request: NextRequest): string {
  const questionMark = request.url.indexOf("?");
  return questionMark === -1 ? "" : request.url.slice(questionMark);
}

function readUpstreamSetCookies(headers: Headers): string[] {
  if (typeof headers.getSetCookie === "function") {
    return headers.getSetCookie();
  }

  // Fallback for runtimes without getSetCookie(): never split on commas here,
  // because Expires values contain them.
  const raw = headers.get("set-cookie");
  return raw ? [raw] : [];
}

function sanitizeResponseHeaders(upstream: Headers): Headers {
  const headers = new Headers();
  upstream.forEach((value, key) => {
    if (!STRIPPED_RESPONSE_HEADERS.has(key.toLowerCase())) {
      headers.set(key, value);
    }
  });
  return headers;
}

/**
 * Forward a validated request to the NestJS backend without parsing or
 * reconstructing the body. JSON, multipart and binary payloads are streamed.
 */
export async function forwardToBackend(
  request: NextRequest,
  options: ForwardOptions,
): Promise<ForwardResult> {
  const baseUrl = getBackendBaseUrl();
  if (!baseUrl) {
    return {
      response: errorResponse(500, "Backend is not configured."),
      upstreamSetCookies: [],
      ok: false,
      status: 500,
    };
  }

  // Explicit routes use fixed paths, but validate them against the same allowlist.
  if (resolveBackendPath(options.path.split("/").filter(Boolean)) !== options.path) {
    return {
      response: errorResponse(400, "Unsupported API path."),
      upstreamSetCookies: [],
      ok: false,
      status: 400,
    };
  }

  // SameSite=Lax is the primary defense; these checks also cover same-site
  // cross-origin requests. Requests without browser security headers are left
  // alone so local tooling and server-to-server calls keep working.
  if (METHODS_WITH_CSRF_CHECK.has(request.method) && !isAllowedBrowserMutation(request)) {
    return {
      response: errorResponse(403, "Cross-origin requests are not allowed."),
      upstreamSetCookies: [],
      ok: false,
      status: 403,
    };
  }

  const headers = new Headers();
  for (const name of FORWARDED_REQUEST_HEADERS) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }
  if (options.sessionCookie) {
    headers.set("cookie", options.sessionCookie);
  }

  const backendUrl = `${baseUrl}${options.path}${getRawSearch(request)}`;

  let upstream: Response;
  try {
    const init: RequestInit & { duplex?: "half" } = {
      method: request.method,
      headers,
      cache: "no-store",
      signal: AbortSignal.timeout(BACKEND_TIMEOUT_MS),
    };

    if (METHODS_WITH_BODY.has(request.method) && request.body) {
      init.body = request.body;
      init.duplex = "half";
    }

    upstream = await fetch(backendUrl, init);
  } catch {
    // Do not log the error object: it may contain the backend URL or headers.
    return {
      response: errorResponse(502, "Backend request failed."),
      upstreamSetCookies: [],
      ok: false,
      status: 502,
    };
  }

  const response = new NextResponse(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: sanitizeResponseHeaders(upstream.headers),
  });

  return {
    response,
    upstreamSetCookies: readUpstreamSetCookies(upstream.headers),
    ok: upstream.ok,
    status: upstream.status,
  };
}
