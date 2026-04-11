"use client"

import type { AuthUser } from "@/lib/types/auth-user"
import { createContext, useContext, useState, useEffect} from "react"

type UserContextType = {
    user: AuthUser| null
    setUser: ( user: AuthUser | null ) => void;
    isLoadingUser: boolean
};

const UserContext = createContext<UserContextType| undefined>(undefined)

export function UserProvider({initialUser, children}: {
    initialUser: AuthUser | null
    children: React.ReactNode
}) {
    const [ user, setUser ] = useState<AuthUser | null>(initialUser);
    const [isLoadingUser, setIsLoadingUser] = useState(true);

    useEffect(() => {
        // mark as loaded after hydration
        setIsLoadingUser(false);
    }, []);

    return (
        <UserContext.Provider value={{user, setUser, isLoadingUser}}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext)
    if (!context) throw new Error("Error, needs to wrap with <UserProvider>")

    return context;
}