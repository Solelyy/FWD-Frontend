"use client"

import type { AuthUser } from "@/lib/types/auth-user"
import { createContext, useContext } from "react"

const UserContext = createContext<AuthUser | null>(null)

export function UserProvider({user, children}: {
    user: AuthUser
    children: React.ReactNode
}) {
    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext)
    if (!context) throw new Error("Error, needs to wrap with <UserProvider>")

    return context;
}