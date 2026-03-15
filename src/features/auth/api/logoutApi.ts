import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/util/api";

export function useLogout() {
    const router = useRouter();

    const logout = async () => {
        await fetch(`${API_BASE_URL}/auth/logout`, {
            method: 'POST'
        });

        router.replace("/");
    };
    return logout;
}