import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/util/api";
import { useUser } from "@/components/providers/UserContext";

export function useLogout() {
    const router = useRouter();
    const {setUser} = useUser();

    const logout = async () => {
        await fetch(`${API_BASE_URL}/auth/logout`, {
            method: 'POST',
            credentials: "include"
        });
        
        setUser(null);

        console.log("Clearing the cookie...")
        router.replace("/"); 
        
        console.log("Successfully logout.")
    };
    return logout;
}