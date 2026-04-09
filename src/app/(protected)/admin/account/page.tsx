import type { Metadata } from "next";
import { ContentLayout } from "@/components/layout/panel/content-layout";

export const metadata: Metadata = {
    title: "My Account"
}
export default function AdminAccount() {

    return(
    <ContentLayout title="My Account">
        <div>
        </div>
    </ContentLayout>
    );
}