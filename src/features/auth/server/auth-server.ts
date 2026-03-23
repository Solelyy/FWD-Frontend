import { headers } from "next/headers";
import { AuthUser } from "@/lib/types/auth-user";

export async function verifyToken(): Promise<AuthUser> {
  const headersList = await headers();
  const cookie = headersList.get("cookie");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
    {
      method: "GET",
      headers: {
        cookie: cookie ?? "",
      },
      //cache: "no-store",
      next: { revalidate: 60 }, // only refetch at most once per 60 seconds

    }
  );
  console.log("VERIFY TOKEN CALLED");
  if (!response.ok) {
    throw new Error("Invalid token");
  }
  const data: AuthUser = await response.json();
  return data;
}