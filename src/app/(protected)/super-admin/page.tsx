import { ContentLayout } from "@/components/layout/panel/content-layout";
import SuperAdminDashboard from "./SuperAdmin";

export default function SuperAdminDashboardPage() {
    return(
    <ContentLayout title="Dashboard">
        <SuperAdminDashboard />
    </ContentLayout>
    );
}