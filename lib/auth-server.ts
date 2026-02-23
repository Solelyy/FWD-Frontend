export async function verifyToken(token: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
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