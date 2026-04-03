## await fetch() 
- It returns full raw http response.
  example: const response = await fetch()

## await response.json()
- Returns parsed JSON body inside the response. 
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

## useRef()
- this is a react hook 
- structure: 
const ref = useRef(initialValue);
- current is the only property inside useRef. 
ex: ref.current
- is a persistent container that survives re-renders without causing re-renders"
- is used to store something in the component “memory” but it doesn’t trigger a new render when the value is updated
- common use cases:
* Store/access a DOM elements
* Store mutable values (no re-render) ex: timer
* Persist values across renders
- simple example is this:
  import { useEffect, useState, useRef } from "react";
  export default function Counter() {
    const [count, setCount] = useState(0);
    const prevCountRef = useRef();

    useEffect(() => {
      prevCountRef.current = count;
    });

    const prevCount = prevCountRef.current;

    return (
      <div className="App">
        <h1>Previous value with useRef</h1>
        <p>
          <button onClick={() => setCount((value) => value + 1)}>
            Increase counter by 1
          </button>
          <button onClick={() => setCount((value) => value + 10)}>
            Increase counter by 10
          </button>
        </p>
        <p>
          Now: {count}, before: {prevCount}
        </p>
      </div>
    );
  }

## ref in <video ref>
- this enables as to directly access the video element in the dom
- ex: 
  <video
    ref={handleVideoRef}
  >
  
  then we have: 
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoRef = (el: HTMLVideoElement | null) => {
    videoRef.current = el;
    if (el) {
      console.log("Video element mounted!");
      setVideoMounted(true);
    }
  };

- flow: react renders the component and creates the <video> element
- added it to the DOM 
- react calls the ref function, it calls the handleVideoRef
- now, the videoRef.current (value of videoRef) has the real video DOM node
- when the component unmounted, the videoRef.current will have null value

## rendering
* Render Phase : this is pure render, it runs the function, calculates the ui, no side effects, it basically just calculates what ui should look like

* Effect Phase : this is the side effects. it enables us for example to reliably access the DOM cause it is already mounted.

- sideeffects or useEffect() runs every AFTER render. 
- life cycle:
  1. Render phase
  - React runs component function
  - builds virtual representation or virtual DOM
  2. Commit phase
  - React creates/updates the real DOM
  - attaches elements to the page
  - assign refs
  3. Effect phase
  - useEffect() runs

## useEffect()
- this is a React hook that let us run a side effect after rendering. 
- ex: 
  * Fetching data from an API
  * Subscribing to events (like window resize or scroll)
  * Updating the DOM manually
  * Setting up timers or intervals
  * Cleaning up resources
- structure:
  import { useEffect } from "react";

  useEffect(() => {
    // This code runs after the component renders
    console.log("Component rendered!");

    return () => {
      // Optional cleanup function - run before the next effect or when the components unmounts
      console.log("Cleanup before next effect or unmount");
    };
  }, [dependencies]);
  - if no dependecies, it will run once after render. if it has dependency, it will run again if that dependency changes.

## Diffing
- this is when React compares the old virtual DOM vs new virtual DOM to make changes in the real DOM
  ex: old: <h1>HELLO WORLD</h1>
  new: <h1>HELLO WORLD!!</h1>
  - change the text only not needed to recreate h1 tag.
- react doesnt read the real DOM it just updates it depends on the diffing.
- 1. Re-run the component (Render phase)
  2. Create new Virtual DOM
  3. Compare with previous one (Diffing)
  4. Only update what changed (Commit phase)

## video
- this is an element used to embed video in web page <video>
- two ways that it can get the data (what to play):
  1. using src - a file or url
  <video src=""/> // it plays a file.
  2. using srcObject - live stream
  ex: videoEl.srcObject = stream;
  - it plays the camera, microphone, screen share
  - srcObject lives in HTMLMediaElement
- mental model:
  <video> :  player
  MediaStream : the data (camera feed)
  srcObject or src : the connector