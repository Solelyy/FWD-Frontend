# Project Dependencies

## react-hook-form
npm install react-hook-form
- https://react-hook-form.com/get-started
- Used for building and validating forms easily.

## @hookform/resolvers
npm install @hookform/resolvers
- Connects form validation libraries like zod to react-hook-form.

## zod
npm install zod
- Schema validation library for forms.

## zustand 
npm install zustand
- Lightweight state management for global app state.

## shadcn
npm install shadcn
- UI component library for building consistent components.

## tailwind css
npm install tailwindcss
- Utility-first CSS framework for styling.

## @tailwindcss/postcss
npm install @tailwindcss/postcss
- PostCSS plugin to process Tailwind styles.

## tailwind-merge
npm install tailwind-merge
- Merge multiple Tailwind classes dynamically.

## tw-animate-css
npm install tw-animate-css
- Adds prebuilt CSS animations for Tailwind.

## lucide-react
npm install lucide-react
- Icon library for React components.

## @radix-ui/react-icons
npm install @radix-ui/react-icons
- Additional icon set from Radix UI.

## class-variance-authority
npm install class-variance-authority
- Helps manage conditional/variant CSS classes.

## clsx
npm install clsx
- Combines class names dynamically based on conditions.

## sonner
npm install sonner
- Toast notifications for success, error, or info messages.

## next-themes
npm install next-themes
- Handles light/dark theme switching.

## eslint
npm install eslint
- Linter for consistent code style and best practices.

## eslint-config-next
npm install eslint-config-next
- ESLint config recommended for Next.js projects.


## env
In production, we must configure the environment variables in our hosting provider, so the url will be https://fwd-portal.com

Example in Vercel:
Dashboard → Project → Settings → Environment Variables
Add:
NEXT_PUBLIC_API_URL = https://fwd-portal.com

PS:
Just ensure:
It matches backend
It’s set in hosting provider
CORS is configured


## Shadcn Components

### Sidebar
npx shadcn@latest add https://shadcn-ui-sidebar.salimi.my/registry/shadcn-sidebar.json
- Adds a Sidebar component for navigation menus.

### Dialog
npx shadcn@latest add dialog
- Adds Dialog component for modals and popups.

### Login Form
npx shadcn@latest add login-01

### Skeleton
npx shadcn@latest add skeleton
- for loading states

### Table
npx shadcn@latest add table
npm install @tanstack/react-table

### Pagination
npx shadcn@latest add pagination

## React Query
npm install @tanstack/react-query
- data-fetching and caching library for React

## Date Picker (Calendar)
npx shadcn@latest add popover calendar
npm install date-fns

## Geolocation API
- this is for location
- docs: https://www.w3.org/TR/geolocation/

## MediaDevices API
- for camera access specifically getUserMedia()
- docs: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices

## Reverse Geocoding API
- OpenStreetMap
- docs: https://nominatim.org/release-docs/develop/api/Reverse/