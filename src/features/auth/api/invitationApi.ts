import { API_BASE_URL } from "@/lib/util/api";

export async  function validateInvitation(token: string) {
    if (!token) throw new Error("Missing token");
    const response = await fetch(`${API_BASE_URL}/auth/validate-token?token=${token}`, {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok) throw new Error("Invalid or expired.");
    return response.json();
}

export async function setPassword(token: string, password: string): Promise<{sucess: boolean}> {
  const response = await fetch(`${API_BASE_URL}/auth/set-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, password })
  });

  if (!response.ok) throw new Error("Failed to set password");

  return response.json();
}