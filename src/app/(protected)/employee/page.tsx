import { ContentLayout } from "@/components/layout/panel/content-layout";
import EmployeeDashboard from "./EmployeeDashboard";

export default function EmployeeDashboardPage() {
    return(
    <ContentLayout title="Dashboard">
        <EmployeeDashboard />
    </ContentLayout>
    );
}