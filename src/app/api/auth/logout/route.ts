import { NextRequest, NextResponse } from "next/server";
import { invalidateUserCache } from "@/features/auth/server/testAuth";

export async function POST(req: NextRequest) {
  console.log("POST [logout]...")

  const token = req.cookies.get("session_token")?.value;

  if (token) {
    invalidateUserCache(token);
  }

  const res = NextResponse.json({ success: true });

  // clear cookies
  res.cookies.set("session_token", "", {
    maxAge: 0,
    path: "/",
  });

  res.cookies.set("user", "", {
    maxAge: 0,
    path: "/",
  });

  return res;
}