"use client"

import { ContentLayout } from "@/components/layout/panel/content-layout";
import {useUser} from "@/components/providers/UserContext"
export default function AdminReimbursement() {
    const { user } = useUser();
    
    return(
    <ContentLayout title="Reimbursement Management">
        <div>
        </div>
    </ContentLayout>
    );
}