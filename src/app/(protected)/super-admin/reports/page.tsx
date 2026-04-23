import { ContentLayout } from "@/components/layout/panel/content-layout";
import type { Metadata } from "next";
import MainReport from "@/app/(protected)/admin/reports/components/MainReport";

export const metadata: Metadata = {
    title: "Reports"
}

export default function Reports() {
    return(
        <ContentLayout title="Reports">
            <MainReport />
        </ContentLayout>
    );
}