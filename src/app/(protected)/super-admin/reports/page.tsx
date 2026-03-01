"use client"

import { ContentLayout } from "@/components/admin-panel/content-layout";
import {useUser} from "@/context/UserContext"
export default function Reports() {
    const user = useUser();
    return(
    <ContentLayout title="Reports">
    <div>
    </div>
    </ContentLayout>
    );
}