import { getAuthError } from "@/features/auth/util/auth-error";
import { LoginCredentials } from "@/lib/types/auth-user";
import { API_BASE_URL } from "@/lib/util/api";

export async function loginAuth(data: LoginCredentials) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    if (response.status === 403) return getAuthError("locked");
    if (response.status === 400) return getAuthError("default");
    if (response.status === 401) return getAuthError("default");

    return getAuthError("other");
  }
  console.log("login status:", response.status);
  return null; // success
}

export async function getUser() {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) return { error: getAuthError("other") };

    const user = await response.json();
    return { user };
  } catch (e) {
    return { error: getAuthError("other") };
  }
}