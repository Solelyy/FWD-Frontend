import { ContentLayout } from "@/components/layout/panel/content-layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Account"
}

export default function ManageAccount() {
    return(
        <ContentLayout title="My Account">
            <div>
            </div>
        </ContentLayout>
    );
}