import { ContentLayout } from "@/components/layout/panel/content-layout";
import Reimbursement from "./components/Reimbursement";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Reimbursements"
}

export default function EmployeeReimbursement() {
    return(
    <ContentLayout title="My Reimbursement">
        <div>
            <Reimbursement/>
        </div>
    </ContentLayout>
    );
}