"use client"

import { ContentLayout } from "@/components/layout/panel/content-layout";
import {useUser} from "@/components/providers/UserContext"
export default function AdminLeave() {
    const { user }= useUser();
    
    return(
    <ContentLayout title="Leave Management">
        <div>
        </div>
    </ContentLayout>
    );
}