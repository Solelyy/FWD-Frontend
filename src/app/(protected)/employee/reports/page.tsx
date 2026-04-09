import { ContentLayout } from "@/components/layout/panel/content-layout";
import Reports from "./components/Reports";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Reports"
}

export default function EmployeeReports() {
    return(
    <ContentLayout title="My Reports">
        <div>
            <Reports />
        </div>
    </ContentLayout>
    );
}