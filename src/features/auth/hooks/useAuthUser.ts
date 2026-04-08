import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../server/auth";

export function useAuthUser() {
    return useQuery({
        queryKey: ["authUser", ],
        queryFn: getAuthUser,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5 , //5 mins
    })
}