import { getAuthError } from "@/features/auth/util/auth-error";
import { LoginCredentials } from "@/lib/types/auth-user";
import { API_BASE_URL } from "@/lib/util/api";
import { AuthUser } from "@/lib/types/auth-user";

export async function loginAuth(data: LoginCredentials): 
Promise<{ user: AuthUser | null; error: string | null }> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    console.error("Login failed:", {
    status: response.status,
    statusText: response.statusText,
  });

    if (response.status === 429) return { user: null, error: getAuthError("locked") };
    if (response.status === 404) return { user: null, error: getAuthError("blocked") };
    if (response.status === 400 ) return { user: null, error: getAuthError("default") };
    if (response.status === 401) return { user: null, error: getAuthError("blocked") }; // inactive/suspended/removed


    return { user: null, error: getAuthError("other") };
  }

  console.log("LOGGING IN...");
  const result = await response.json();
  const user: AuthUser = result.data.user;
  return { user, error: null };
}