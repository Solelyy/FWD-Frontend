import { UserRole } from "@/lib/types/roles";
import { AccountInfo } from "../types/account";

type ResendInvitePayload = {
    email: AccountInfo["email"];
    role: AccountInfo["role"]
}
export async function resendInviteApi({email, role}: ResendInvitePayload ) {
    const endpoint = role === UserRole.ADMIN
    ? "/api/superadmin/users/resend-email?"
    : "/api/admin/users/resend-email?";

    const response = await fetch(`${endpoint}email=${email}`, {
        method: "POST",
        credentials: "include"
    })
    
    if(!response.ok) throw new Error("Cannot resend email invitation in this account.");

    const result = await response.json();
    return result;
}