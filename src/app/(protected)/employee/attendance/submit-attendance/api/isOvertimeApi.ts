import { API_BASE_URL } from "@/lib/util/api";

export async function isOvertimeApi() {
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
        return { canTimeOut: true };
    }

    const response = await fetch(`${API_BASE_URL}/employee/is-overtime`, {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error ("Unable to fetch overtime threshold.");
    }

    const result = await response.json();
    console.log("Result isOvertime api: ", result);
    return result;
}