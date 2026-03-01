"use client"

import { ContentLayout } from "@/components/admin-panel/content-layout";
import {useUser} from "@/context/UserContext"
export default function ManageAccount() {
    const user = useUser();
    return(
    <ContentLayout title="Manage Account">
    <div>
    </div>
    </ContentLayout>
    );
}