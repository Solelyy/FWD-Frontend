"use client"

import { ContentLayout } from "@/components/shared/layout/panel/content-layout";
import {useUser} from "@/components/shared/providers/UserContext"
export default function ManageAccount() {
    const user = useUser();
    return(
    <ContentLayout title="Manage Account">
    <div>
    </div>
    </ContentLayout>
    );
}