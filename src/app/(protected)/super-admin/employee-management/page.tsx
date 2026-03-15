"use client"

import { ContentLayout } from "@/components/layout/panel/content-layout";
import {useUser} from "@/components/providers/UserContext"
export default function EmployeeManagement() {
    const user = useUser();
    return(
    <ContentLayout title="Employee Management">
    <div>
    </div>
    </ContentLayout>
    );
}