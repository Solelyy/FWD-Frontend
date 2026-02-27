import {useUser} from "@/context/UserContext"
export default function SuperAdminDashboard() {
    const user = useUser();
    return(
        <>
        <main className="flex w-full flex-col items-center justify-start px-6 pb-16">
            <div className="w-full max-w-md">
                <p className="text-2xl"> WELCOME, {user.firstname} !!! YOU ARE NOW IN SUPER ADMIN DASHBOARD 😛 </p>
            </div>
        </main>
    </>  
    );
}