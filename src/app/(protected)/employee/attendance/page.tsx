"use client"

import { ContentLayout } from "@/components/shared/layout/panel/content-layout";
import {useUser} from "@/components/shared/providers/UserContext"
export default function EmployeeAttendance() {
    const user = useUser();

    return(
    <ContentLayout title="My Attendance">
        <div>
        </div>
    </ContentLayout>
    );
}