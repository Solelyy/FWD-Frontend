import { ContentLayout } from "@/components/layout/panel/content-layout";
import AdminManagement from "./AdminManagement";
import type { Metadata } from "next";

export const metadata:Metadata = {
    title: "Admin Management"
}

export default function AdminManagementPage() {
    return(
        <ContentLayout title="Admin Management">
            <AdminManagement />
        </ContentLayout>
    );
}