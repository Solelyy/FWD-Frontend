import { headers } from "next/headers";

export async function verifyToken() {
  const headersList = await headers();
  const cookie = headersList.get("cookie");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
    {
      method: "GET",
      headers: {
        cookie: cookie ?? "",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Invalid token");
  }

  return response.json();
}