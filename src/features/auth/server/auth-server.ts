import { headers } from "next/headers";
import { AuthUser } from "@/lib/types/auth-user";

export async function verifyToken(): Promise<AuthUser | null> {
  try {
    const apiBaseUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;
    if (!apiBaseUrl) {
      console.error("verifyToken ERROR: missing API_URL/NEXT_PUBLIC_API_URL");
      return null;
    }

    const headersList = await headers();
    const cookie = headersList.get("cookie");

    console.log("VERIFY TOKEN CALLED");
    const response = await fetch(
      `${apiBaseUrl}/auth/me`,
      {
        method: "GET",
        headers: {
          cookie: cookie ?? "",
        },
        cache: "no-store",
        //next: { revalidate: 60 }, // only refetch at most once per 60 seconds but not best for auth

      }
    );
    console.log("COOKIE FROM HEADERS (has session token):", Boolean(cookie?.includes("session_token=")));
    console.log("COOKIE: ", cookie);

    if (!response.ok) {
      console.warn("Token invalid or expired");
      return null;
    }
    const raw = await response.json();
    const data = (raw?.data?.user ?? raw?.data ?? raw) as Partial<AuthUser>;

    if (!data || typeof data !== "object" || !data.employeeId || !data.role) {
      console.warn("Unexpected /auth/me response shape");
      return null;
    }

    console.log("auth/me response: ", data); 

    return data as AuthUser;
  } catch (error) {
    console.error("verifyToken ERROR:", error);
    return null;
  }
}