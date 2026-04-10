import { ContentLayout } from "@/components/layout/panel/content-layout";
import type { Metadata } from "next";
import MainReport from "@/features/reports/components/MainReport";

export const metadata: Metadata = {
    title: "Reports"
}

export default function AdminReports() {
    return(
        <ContentLayout title="Reports">
            <MainReport />
        </ContentLayout>
    );
}