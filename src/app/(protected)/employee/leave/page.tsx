"use client"

import { ContentLayout } from "@/components/layout/panel/content-layout";
import {useUser} from "@/components/providers/UserContext"
import LeaveTable from "./components/LeaveTable";
export default function EmployeeLeave() {
    const { user } = useUser();

    return(
    <ContentLayout title="My Leave">
        <div>
            <LeaveTable/>
        </div>
    </ContentLayout>
    );
}