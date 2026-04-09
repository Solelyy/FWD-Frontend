import AttendanceLogs from "./components/AttendanceLogs";
import { ContentLayout } from "@/components/layout/panel/content-layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Attendance"
}
export default function EmployeeAttendance() {

    return(
    <ContentLayout title="My Attendance">
        <AttendanceLogs />
    </ContentLayout>
    );
}