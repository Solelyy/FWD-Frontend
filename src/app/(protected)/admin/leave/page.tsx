import { ContentLayout } from "@/components/layout/panel/content-layout";
import type { Metadata } from "next";
import LeaveManagement from "./Leave";

export const metadata: Metadata = {
    title: "Leave Management"
}

export default function AdminLeave() {
    return(
    <ContentLayout title="Leave Management">
        <LeaveManagement />
    </ContentLayout>
    );
}