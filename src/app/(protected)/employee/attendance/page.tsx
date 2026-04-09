"use client"
import AttendanceLogs from "./AttendanceLogs";
import { ContentLayout } from "@/components/layout/panel/content-layout";
import {useUser} from "@/components/providers/UserContext"
export default function EmployeeAttendance() {
    const { user } = useUser();

    return(
    <ContentLayout title="My Attendance">
        <div>
            <AttendanceLogs />
        </div>
    </ContentLayout>
    );
}