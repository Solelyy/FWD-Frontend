import { ContentLayout } from "@/components/layout/panel/content-layout";
import LeaveTable from "./components/LeaveTable";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Leave"
}
export default function EmployeeLeave() {
    return(
    <ContentLayout title="My Leave">
        <div>
            <LeaveTable/>
        </div>
    </ContentLayout>
    );
}