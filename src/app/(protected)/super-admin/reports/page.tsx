"use client"

import { ContentLayout } from "@/components/shared/layout/panel/content-layout";
import {useUser} from "@/components/shared/providers/UserContext"
export default function Reports() {
    const user = useUser();
    return(
    <ContentLayout title="Reports">
    <div>
    </div>
    </ContentLayout>
    );
}