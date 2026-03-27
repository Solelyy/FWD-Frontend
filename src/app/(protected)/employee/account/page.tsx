"use client"

import { ContentLayout } from "@/components/layout/panel/content-layout";
import {useUser} from "@/components/providers/UserContext"
export default function EmployeeAccount() {
    const { user } = useUser();

    return(
    <ContentLayout title="My Account">
        <div>
        </div>
    </ContentLayout>
    );
}