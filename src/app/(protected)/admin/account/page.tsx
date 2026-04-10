import type { Metadata } from "next";
import { ContentLayout } from "@/components/layout/panel/content-layout";
import Account from "@/features/profile-account/components/Accounts";

export const metadata: Metadata = {
    title: "My Account"
}
export default function AdminAccount() {

    return(
    <ContentLayout title="My Account">
        <Account />
    </ContentLayout>
    );
}