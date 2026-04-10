import { ContentLayout } from "@/components/layout/panel/content-layout";
import AdminDashboard from "./Admin";

export default function AdminDashboardPage() {
    return(
    <ContentLayout title="Dashboard">
        <AdminDashboard />
    </ContentLayout>
    );
}