import { AccountInfo } from "../types/account";
import { API_BASE_URL } from "@/lib/util/api";

export async function resendInviteApi({email}: {email: AccountInfo["email"]}) {
    const endpoint = "/";

    const response = await fetch(`${API_BASE_URL}${endpoint}/emal=${email}`, {
        method: "GET",
        credentials: "include"
    })
    
    if(!response.ok) throw new Error("Cannot suspend this account.");

    const result =await response.json();
    return result;
}