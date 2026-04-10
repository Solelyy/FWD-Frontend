import { ContentLayout } from "@/components/layout/panel/content-layout";
import type { Metadata } from "next";
import Attendance from "./Attendance";

export const metadata: Metadata = {
    title: "Attendance Management"
}

export default function AdminAttendancePage() {
    return(
    <ContentLayout title="Attendance Management">
        <Attendance />
    </ContentLayout>
    );
}