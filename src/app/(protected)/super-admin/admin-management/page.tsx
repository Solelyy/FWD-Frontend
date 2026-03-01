"use client"

import { ContentLayout } from "@/components/admin-panel/content-layout";
import {useUser} from "@/context/UserContext"
export default function AdminManagement() {
    const user = useUser();
    return(
    <ContentLayout title="Admin Management">
    <div>
    </div>
    </ContentLayout>
    );
}