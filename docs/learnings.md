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

## force-dynamic
- We need to include at the top of the layout.tsx because Next.js App Router layouts/pages are server components and try to prerender child pages statically whenever possible. But if your page or child component needs client-only features (like useSearchParams, useState, useEffect, browser APIs), static prerendering fails.

- dynamic = "force-dynamic" tells Next.js: “Hey! Don’t try to statically prerender this layout or its children. Always treat it as dynamic at runtime.”

- When do we need it:
* Server layout + client page = dynamic needed
* Server layout + server page = static OK
* Client layout/page = dynamic by default, no need to declare

## autoComplete
- autoComplete tells the browser how to automatically fill or suggest values for an input field.
- It helps browsers and password managers (Chrome, Safari, 1Password, etc.) know what kind of data the field expects.
* Example: Login
- the browser may autofill saved email/username, current pass
<Input type="text" autoComplete="username" />
<Input type="password" autoComplete="current-password" />

* Example: Sign up
- tells browser that the user is creating a password and might suggest a strong one.
<Input type="password" autoComplete="new-password">
  
## Boolean conversion
- we use !! dobuble NOT operator to convert something as a boolean. 
ex: const isError = !!error
- if error value is falsy, it will be false. if truthy, converts it to true.

## React.Dispatch<>
- it defines a function and returns nothing. 

## Rate Limiting
- when the api is being hit multiple times at the same time by the same user. 
- it is being triggered when the components are calling it. 

## cache: {next: revalidate}
- this revalidate the request ex:token every x seconds
- this is better than no-store (depends on the situation) because it has staletime so it doesnt call the api every seconds
- for example for 60 secs: 
  cache: {
    next: revalidate: 60
  }

## Memoization 
- it is a programming pattern where we store the result of a function so we can call it with the same inputs
- reuse stored result instead of recalculating or refetching

## React Query (TanStack Query)
- data-fetching and caching library for React
- instead of manually using useState + useEffect for api calls, react query :
    * handles fetching, caching, and updating data automatically
    * provides loading, error, and success states
    * automatically refetches or invalidates queries when data changes
    * works great with server state—data that lives on the backend and can change outside the app
- react query concepts:
    * Query → A single piece of data fetched from the server (e.g., accounts)
    * Query Key → Unique ID for the query (used for caching)
    * Query Function → Function that fetches the data (getAccounts)
    * Mutation → Used for creating, updating, deleting server data
    * Cache → Stores previously fetched data to avoid unnecessary requests
    * Stale-While-Revalidate → React Query can show cached data while fetching new data in the background
- how to set up:
  * QueryClient 
  - this is the core engine that stores all queries, caches, and configs
  const queryClient = new QueryClient();

  - we can store default options too:
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,  // 1 minute cache
        retry: 1,               // retry once on failure
      },
    },
  });

  * QueryProvider 
  - attach it layout.tsx to make queryClient available via react context to all children

  * useQuery - fetch data
  * useMutation - change data

### refetchType 
- this is the kind of refetch we want when we invalidate a query




## cache 
- import { cache } from "react";
- in this way we can use caching, for us to get the cache result and doesnt need to call to api again.