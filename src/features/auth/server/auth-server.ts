import { headers } from "next/headers";
import { AuthUser } from "@/lib/types/auth-user";

export async function verifyToken(): Promise<AuthUser | null> {
  try {
    const headersList = await headers();
    const cookie = headersList.get("cookie");

    console.log("VERIFY TOKEN CALLED");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
      {
        method: "GET",
        headers: {
          cookie: cookie ?? "",
        },
        cache: "no-store",
        //next: { revalidate: 60 }, // only refetch at most once per 60 seconds but not best for auth

      }
    );
    console.log("COOKIE FROM HEADERS:", cookie);

    if (!response.ok) {
      console.warn("Token invalid or expired");
      return null;
    }
    const data: AuthUser = await response.json();
    return data;
  } catch (error) {
    console.error("verifyToken ERROR:", error);
    return null;
  }
}