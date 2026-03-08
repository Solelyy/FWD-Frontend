import { Toaster } from "sonner"
export const metadata = {
    title: "Set Password",
}
export default function SetPasswordLayout({children}: {children:React.ReactNode}) {
   return <>
   {children}
   <Toaster richColors position= "top-center" />
   </>
}