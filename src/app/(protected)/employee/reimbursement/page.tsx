"use client"

import { ContentLayout } from "@/components/shared/layout/panel/content-layout";
import {useUser} from "@/components/shared/providers/UserContext"
export default function EmployeeReimbursement() {
    const user = useUser();

    return(
    <ContentLayout title="My Reimbursement">
        <div>
        </div>
    </ContentLayout>
    );
}