"use client"

import { ContentLayout } from "@/components/admin-panel/content-layout";
import {useUser} from "@/context/UserContext"
export default function EmployeeManagement() {
    const user = useUser();
    return(
    <ContentLayout title="Employee Management">
    <div>
    </div>
    </ContentLayout>
    );
}