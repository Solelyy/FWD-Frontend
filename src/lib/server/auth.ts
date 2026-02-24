import { redirect } from "next/navigation"
import { verifyToken } from "./auth-server"

export async function requireAuth() {
  try {
    const user = await verifyToken()
    return user
  } catch (error) {
    console.error(error)
    redirect("/")
  }
}