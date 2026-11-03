import type { Metadata } from "next";
import { ContentLayout } from "@/components/layout/panel/content-layout";
import { TrendAnalysis } from "./components/TrendAnalysis";

export const metadata: Metadata = {
  title: "My Trend Analysis",
};

export default function EmployeeTrendAnalysisPage() {
  return (
    <ContentLayout title="My Trend Analysis">
      <TrendAnalysis />
    </ContentLayout>
  );
}
