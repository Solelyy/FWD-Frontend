"use client"

import { ContentLayout } from "@/components/layout/panel/content-layout";
import {useUser} from "@/components/providers/UserContext"
export default function EmployeeReports() {
    const { user } = useUser();

    return(
    <ContentLayout title="My Reports">
        <div>
        </div>
    </ContentLayout>
    );
}