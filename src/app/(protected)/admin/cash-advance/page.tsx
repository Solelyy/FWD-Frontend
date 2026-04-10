import { ContentLayout } from "@/components/layout/panel/content-layout";

import type { Metadata } from "next";
import CashAdvanceTableWrapper from "./components/CashAdvanceTableWrapper";

export const metadata: Metadata = {
    title: "Cash Advance Management"
}

export default function AdminCashAdvance() {
    return(
    <ContentLayout title="Cash Advance Management">
        <CashAdvanceTableWrapper />
    </ContentLayout>
    );
}