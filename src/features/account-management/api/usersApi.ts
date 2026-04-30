import { UserRole } from "@/lib/types/roles";
import { API_BASE_URL } from "@/lib/util/api";
import { Status } from "../types/account";

/*
const mockUser = [
    {
    employeeId: "FWD123",
    firstname: "Jessa",
    lastname: "Gozun",
    email: "jessagozun@gmail.com",
    status: Status.ACTIVE,
    invitationDate: "",
    role: UserRole.EMPLOYEE
}]
*/

export async function getAccounts(role: UserRole.ADMIN | UserRole.EMPLOYEE) {

    /*
    if (process.env.NODE_ENV=== "development") {
        return mockUser;
    }*/

    const endpoint = role === UserRole.ADMIN 
    ? "/superadmin/management/users"
    : "/admin/management/users";

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "GET",
        credentials: "include",
    });

    if(!response.ok) throw new Error("Cannot fetch accounts.");

    const result =await response.json();

    console.log("FETCHING ACCOUNTS:", role);

    if (!result || !result.data) return [];
    return result.data;
}