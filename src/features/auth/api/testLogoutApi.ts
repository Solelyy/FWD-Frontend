import { useUser } from "@/components/providers/UserContext";

export function testLogoutApi() {
    console.log("📍useLogout...")

    const { setUser } = useUser();

    const logout = async () => {
    await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
    });

    setUser(null);

    console.log("Redirecting to login...")
    //router.replace("/");
    window.location.assign("/")
    };    

    return logout;

}