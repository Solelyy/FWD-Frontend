import { useRouter } from "next/navigation";

export function useLogout() {
    const router = useRouter();

    const logout = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
            method: 'POST'
        });

        router.replace("/");
    };
    return logout;
}