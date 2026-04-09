"use client"

import { ContentLayout } from "@/components/layout/panel/content-layout";
import {useUser} from "@/components/providers/UserContext"
import Account from "@/features/profile-account/components/Accounts";
export default function EmployeeAccount() {
    const { user } = useUser();

    return(
    <ContentLayout title="My Account">
        <div>
            <Account />
        </div>
    </ContentLayout>
    );
}