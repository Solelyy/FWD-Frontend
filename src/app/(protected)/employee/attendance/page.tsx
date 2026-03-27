"use client"

import { ContentLayout } from "@/components/layout/panel/content-layout";
import {useUser} from "@/components/providers/UserContext"
export default function EmployeeAttendance() {
    const { user } = useUser();

    return(
    <ContentLayout title="My Attendance">
        <div>
        </div>
    </ContentLayout>
    );
}