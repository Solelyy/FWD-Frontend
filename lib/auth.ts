import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { verifyToken } from "./auth-server"

export async function requireAuth() {
  const storeCookies = await cookies()
  const token = storeCookies.get("token")?.value

  if (!token) redirect("/")

  try {
    const user = await verifyToken(token)
    return user
  } catch (error) {
    console.error(error)
    redirect("/")
  }
}