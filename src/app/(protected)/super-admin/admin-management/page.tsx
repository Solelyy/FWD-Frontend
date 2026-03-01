"use client"

import { ContentLayout } from "@/components/shared/layout/panel/content-layout";
import {useUser} from "@/components/shared/providers/UserContext"
export default function AdminManagement() {
    const user = useUser();
    return(
    <ContentLayout title="Admin Management">
    <div>
    </div>
    </ContentLayout>
    );
}