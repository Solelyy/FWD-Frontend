import { useRouter } from "next/navigation";
import { useUser } from "@/components/providers/UserContext";
import { startTransition } from "react";

export function useLogout() {
    const router = useRouter();
    const {setUser} = useUser();

    const logout = async () => {
        try {
            await fetch("/api/auth/logout", {
                method: "POST",
                credentials: "include",
            });

            setUser(null);
            console.log("Redirecting to landing page...")

            startTransition(() => {
                router.replace("/");
            });
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };
    return logout;
}