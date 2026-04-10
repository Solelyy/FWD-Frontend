import { ContentLayout } from "@/components/layout/panel/content-layout";
import type { Metadata } from "next";
import Account from "@/features/profile-account/components/Accounts";

export const metadata: Metadata = {
    title: "My Account"
}

export default function ManageAccount() {
    return(
        <ContentLayout title="My Account">
            <Account />
        </ContentLayout>
    );
}