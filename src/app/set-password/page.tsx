"use client"

import InvitationExpired from "@/features/auth/components/InvitationExpired";
import SetPasswordForm from "@/features/auth/components/SetPassword";
import { validateInvitation } from "@/features/auth/api/invitationApi";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SkeletonForm } from "@/components/skeletons/Form";
import Header from "@/components/layout/Header";

export default function SetPassword() {

    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [status, setStatus] = useState<"loading" | "valid" | "expired">("loading");
    const [employeeId, setEmployeeId] = useState<string | null>(null);

    useEffect(() => {
        if (!token) {
            setStatus("expired");
            return;
        }

        const validate = async () => {
            try {
                const response = await validateInvitation(token);
                setEmployeeId(response.employeeId);
                setStatus("valid");
            } catch(err) {
                setStatus("expired");
            }
        }

        validate();
    }, [token]);

    return (
        <div className="hero-section flex min-h-screen flex-col gap-8 px-4 pt-5 sm:px-6">
            <Header />
            <main className="flex w-full flex-1 flex-col items-center justify-center px-2 pb-12 transition-opacity duration-300 ease-in-out sm:px-0 sm:pb-20">
                <div className="w-full max-w-md">
                    {status === "loading" && <SkeletonForm/>}
                    {status === "valid" && token && employeeId && ( 
                        <SetPasswordForm token={token} employeeId={employeeId}/>
                    )}
                    {status === "expired" && <InvitationExpired />}
                </div>
            </main>
        </div>
    );
}