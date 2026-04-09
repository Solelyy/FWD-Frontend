import { ContentLayout } from "@/components/layout/panel/content-layout";
import Account from "@/features/profile-account/components/Accounts";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Account"
}

export default function EmployeeAccount() {
    return(
    <ContentLayout title="My Account">
        <div>
            <Account />
        </div>
    </ContentLayout>
    );
}