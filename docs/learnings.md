## await fetch() 
It returns full raw http response.
example: const response = await fetch()

## await response.json()
Returns parsed JSON body inside the response. 
example: const result = await response.json()


## headers 
import { headers } from "next/headers"
- it is a Next.js App Router server utility
- headers() let us read the incoming HTTP request on the server
- this works only in server components; not usable in client
- http headers are extra information about a request

example use: 
const headerList=  await headers();

- we want to extract the cookie in the header to pass in the backend
const cookie = headerList.get("cookie");

- we manually pass it to the backend since it is server to server (Next.js server to backend server) request. node.js doesn't have a cookie jar and doesn't automatically manages cookie, unlike the browser that is why we need to manually the cookie before we pass to the backend.
 
ex:
const response = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
  {
    method: "GET",
    headers: {
      cookie: cookie ?? "",
    },
    cache: "no-store",
  }
);

## cookie ?? ""
- uses nullish coalescing operator (??), means if the value on the left is undefined or null, use the value on the right
- we don't want to pass the cookie directly because headers in fetch expect string, cookie might be sting | null. 
- this is to avoid runtime error when there is no real cookie pass to the backend
- the difference of ?? and || is that nullish only replaces null or undefined, while OR operator replaces null, undefined, 0, "", false

## cache: "no-store" 
- tells Next.js to do not cache this request, always fetch fresh data

## createContext
- creates a global container where data can be stored and shared accross components
ex:
"use client"
import { createContext, useContext } from "react"
const UserContext = createContext<User | null>(null)

## Provider 
- puts the data inside the container. 
ex: 
export function UserProvider({user, children}: {
    user: User
    children: React.ReactNode
}) {
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>
} 

## useContext
- reads the value inside the context
const context = useContext(UserContext);

## 3 Kinds of states in react
* Local state - inside one component
* Context state (global state) - shared but simple (ex: createContext), this is for rarely changes states, ex is authentication
* External store - ex is Zustand, it is for frequently changing states like dashboard and notifications