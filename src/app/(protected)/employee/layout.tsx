import { ReactNode } from "react"
import { UserProvider } from "@/components/shared/providers/UserContext"
import { UserRole } from "@/lib/util/roles";
import { requireRole } from "@/lib/server/auth"

type Props = {
  children: ReactNode
  params: { employeeId: string }
}

export default async function EmployeeLayout({ children}: Props) {
  const user = await requireRole(UserRole.EMPLOYEE);

  return <UserProvider user={user}>{children}</UserProvider>
}