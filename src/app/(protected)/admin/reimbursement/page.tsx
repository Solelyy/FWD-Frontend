import { ContentLayout } from "@/components/layout/panel/content-layout";
import type { Metadata } from "next";
import ReimbursementTableWrapper from "./components/ReimbursementTableWrapper";

export const metadata: Metadata = {
    title: "Reimbursement Management"
}

export default function AdminReimbursement() {
    return(
    <ContentLayout title="Reimbursement Management">
        <div>
            <ReimbursementTableWrapper />
        </div>
    </ContentLayout>
    );
}