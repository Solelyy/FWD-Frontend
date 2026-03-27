"use client"

import type { AuthUser } from "@/lib/types/auth-user"
import { createContext, useContext, useState } from "react"

type UserContextType = {
    user: AuthUser| null
    setUser: ( user: AuthUser | null ) => void;
};

const UserContext = createContext<UserContextType| undefined>(undefined)

export function UserProvider({initialUser, children}: {
    initialUser: AuthUser
    children: React.ReactNode
}) {
    const [ user, setUser ] = useState<AuthUser | null>(initialUser);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext)
    if (!context) throw new Error("Error, needs to wrap with <UserProvider>")

    return context;
}