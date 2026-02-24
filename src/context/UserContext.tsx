"use client"

import { createContext, useContext } from "react"

export type User = {
    id: string
    role: string
    employeeId: string
    firstname?: string
    lastname?:string
}

const UserContext = createContext<User | null>(null)

export function UserProvider({
    user,
    children,
}: {
    user: User
    children: React.ReactNode
}) {
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export function useUser() {
    const context = useContext(UserContext)
    if (!context) throw new Error("Error, needs to wrap with <UserProvider>")

    return context;
}