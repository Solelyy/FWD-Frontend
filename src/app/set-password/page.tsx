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
        <div className="hero-section flex flex-col gap-8">
            <Header />
            <main className=" transition-opacity duration-300 ease-in-out flex w-full flex-col items-center justify-start px-6 pb-16">
                <div className="w-full max-w-md mt-10 sm:mt-8">
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