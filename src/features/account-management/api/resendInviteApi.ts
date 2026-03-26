import { UserRole } from "@/lib/types/roles";
import { AccountInfo } from "../types/account";
import { API_BASE_URL } from "@/lib/util/api";

type ResendInvitePayload = {
    email: AccountInfo["email"];
    role: AccountInfo["role"]
}
export async function resendInviteApi({email, role}: ResendInvitePayload ) {
    const endpoint = role === UserRole.ADMIN
    ? "/superadmin/users/resend-email?"
    : "/admin/users/resend-email?";

    const response = await fetch(`${API_BASE_URL}${endpoint}email=${email}`, {
        method: "POST",
        credentials: "include"
    })
    
    if(!response.ok) throw new Error("Cannot resend email invitation in this account.");

    const result = await response.json();
    return result;
}