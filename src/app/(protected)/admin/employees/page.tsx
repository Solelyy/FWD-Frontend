import { ContentLayout } from "@/components/layout/panel/content-layout";
import Employees from "./Employees";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Employee Management"
}

export default function EmployeeManagementPage() {
    
    return(
        <ContentLayout title="Employee Management">
            <Employees />
        </ContentLayout>
    );
}