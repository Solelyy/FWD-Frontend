import { ReactNode } from "react"
import { requireAuth } from "@/lib/server/auth"
import { UserProvider } from "@/components/shared/providers/UserContext"
import { redirect } from "next/navigation"

type Props = {
  children: ReactNode
  params: { employeeId: string }
}

export default async function EmployeeLayout({ children}: Props) {
  const user = await requireAuth()

  if (user.role !== "EMPLOYEE") redirect("/unauthorized")

  return <UserProvider user={user}>{children}</UserProvider>
}