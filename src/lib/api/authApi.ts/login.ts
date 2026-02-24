import { getAuthError } from "@/lib/util/authError";

export async function loginAuth(data: any) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    if (response.status === 403) return getAuthError("locked");
    if (response.status === 401) return getAuthError("default");
    return getAuthError("other");
  }
}

export async function getUser() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
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