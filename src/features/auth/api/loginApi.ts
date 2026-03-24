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
    if (response.status === 429) return { user: null, error: getAuthError("locked") };
    if (response.status === 404) return { user: null, error: getAuthError("blocked") };
    if (response.status === 400 || response.status === 401) return { user: null, error: getAuthError("default") };
    return { user: null, error: getAuthError("other") };
  }

  console.log("LOGGING IN");
  const user: AuthUser = await response.json();
  return { user, error: null };
}