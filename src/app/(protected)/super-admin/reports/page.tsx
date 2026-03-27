"use client"

import { ContentLayout } from "@/components/layout/panel/content-layout";
import {useUser} from "@/components/providers/UserContext"
export default function Reports() {
    const { user } = useUser();
    return(
    <ContentLayout title="Reports">
    <div>
    </div>
    </ContentLayout>
    );
}