# Use react-hook-form
npm install react-hook-form
https://react-hook-form.com/get-started

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