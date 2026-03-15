"use client"

import { ContentLayout } from "@/components/layout/panel/content-layout";
import {useUser} from "@/components/providers/UserContext"
export default function AdminAttendance() {
    const user = useUser();
    
    return(
    <ContentLayout title="Attendance Management">
        <div>
        </div>
    </ContentLayout>
    );
}