"use client"

import { ContentLayout } from "@/components/shared/layout/panel/content-layout";
import {useUser} from "@/components/shared/providers/UserContext"
export default function EmployeeReports() {
    const user = useUser();

    return(
    <ContentLayout title="My Reports">
        <div>
        </div>
    </ContentLayout>
    );
}