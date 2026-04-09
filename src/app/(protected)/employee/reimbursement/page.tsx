"use client"

import { ContentLayout } from "@/components/layout/panel/content-layout";
import {useUser} from "@/components/providers/UserContext"
import Reimbursement from "./components/Reimbursement";
export default function EmployeeReimbursement() {
    const { user } = useUser();

    return(
    <ContentLayout title="My Reimbursement">
        <div>
            <Reimbursement/>
        </div>
    </ContentLayout>
    );
}