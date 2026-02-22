export async function verifyToken(token: string) {
  const response = await fetch("http://localhost:8080/api/auth/me", {
    method: "GET",
    headers: {
      Cookie: `token=${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Invalid token");
  }

  return response.json();
}