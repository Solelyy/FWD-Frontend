"use client"

import { ContentLayout } from "@/components/layout/panel/content-layout";
import {useUser} from "@/components/providers/UserContext"
import CashAdvance from "./components/CashAdvance";
export default function EmployeeCashAdvance() {
    const { user }  = useUser();

    return(
    <ContentLayout title="My Cash Advance">
        <div>
            <CashAdvance />
        </div>
    </ContentLayout>
    );
}