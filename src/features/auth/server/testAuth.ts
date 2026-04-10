import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AuthUser } from "@/lib/types/auth-user";
import { UserRole } from "@/lib/types/roles";

// --- In-memory cache keyed by session token ---
const userCache = new Map<string, Promise<AuthUser | null>>();

function getDevAuthUser(): AuthUser {
  return {
    id: "1",
    role: UserRole.EMPLOYEE,
    employeeId: "FWD123",
    firstname: "Jessa",
    lastname: "Gozun",
    email: "dinavelbinongo@gmail.com",
    isDataPolicyAccepted: true,
  };
}

// --- Internal fetch to /auth/me ---
async function fetchAuthUser(token: string): Promise<AuthUser | null> {
  try {
    console.log(`[fetchAuthUser] Fetching user for token: ${token}`);

    const apiBaseUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;
    if (!apiBaseUrl) {
      console.error("[fetchAuthUser] Missing API_URL or NEXT_PUBLIC_API_URL");
      return null;
    }

    const response = await fetch(`${apiBaseUrl}/auth/me`, {
      method: "GET",
      headers: { cookie: `session_token=${token}` },
      cache: "no-store", // always fresh for first fetch
    });

    if (!response.ok) {
      console.warn("[fetchAuthUser] Token invalid or expired");
      return null;
    }

    const raw = await response.json();
    const data = (raw?.data?.user ?? raw?.data ?? raw) as Partial<AuthUser>;

    if (!data || !data.employeeId || !data.role) {
      console.warn("[fetchAuthUser] Unexpected /auth/me response shape", data);
      return null;
    }

    console.log("[fetchAuthUser] User fetched successfully:", data);
    return data as AuthUser;
  } catch (err) {
    console.error("[fetchAuthUser] ERROR:", err);
    return null;
  }
}

// --- Public: Get cached AuthUser for this request ---
export async function testGetAuthUser(): Promise<AuthUser | null> {
  const headersList = await headers();
  const cookie = headersList.get("cookie") || "";
  const match = cookie.match(/session_token=([^;]+)/);
  const token = match?.[1];

  if (!token) {
    if (process.env.NODE_ENV === "development") {
      console.log("[getAuthUser] No session_token found. Using development proxy user.");
      return getDevAuthUser();
    }
    console.log("[getAuthUser] No session_token found in cookies");
    return null;
  }

  // Check cache
  if (userCache.has(token)) {
    console.log("[getAuthUser] Returning cached user for token:", token);
    return userCache.get(token)!;
  }

  // Fetch and cache
  console.log("[getAuthUser] No cache found. Fetching user...");
  const promise = fetchAuthUser(token).catch((err) => {
    userCache.delete(token); // remove failed fetch
    throw err;
  });

  userCache.set(token, promise);
  return promise;
}

// --- Guard: Require user to be authenticated ---
export async function testRequireAuth(): Promise<AuthUser | null> {
  // only need this for ui development (not running the backend)
  if (process.env.NODE_ENV === "development") {
    return getDevAuthUser();
  } 
  try {
    console.log("[requireAuth] Checking authentication...");
    const user = await testGetAuthUser();
    if (!user) {
      console.warn("[requireAuth] User not authenticated. Redirecting...");
      redirect("/");
    }
    console.log("[requireAuth] User authenticated:", user.employeeId);
    return user;
  } catch (err) {
    console.error("[requireAuth] ERROR:", err);
    redirect("/");
  }
}

// --- Guard: Require specific role ---
export async function testRequireRole(role: UserRole): Promise<AuthUser | null> {
  console.log("[requireRole] Checking role:", role);
  const user = await testRequireAuth();

  if (!user) {
    console.warn("[requireRole] No user found after auth. Redirecting...");
    redirect("/");
  }

  if (user.role !== role) {
    console.warn(`[requireRole] Unauthorized. User role: ${user.role}, required: ${role}`);
    redirect("/unauthorized");
  }

  console.log("[requireRole] Role authorized:", role);
  return user;
}