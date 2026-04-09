import { ContentLayout } from "@/components/layout/panel/content-layout";
import CashAdvance from "./components/CashAdvance";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Cash Advance"
}

export default function EmployeeCashAdvance() {
    return(
    <ContentLayout title="My Cash Advance">
        <div>
            <CashAdvance />
        </div>
    </ContentLayout>
    );
}