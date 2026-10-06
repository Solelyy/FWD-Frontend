import { ContentLayout } from "@/components/layout/panel/content-layout";
import type { Metadata } from "next";
import { TrendAnalysis } from "@/features/trend-analysis/components/TrendAnalysis";

export const metadata: Metadata = {
  title: "Trend Analysis",
};

export default function SuperAdminTrendAnalysisPage() {
  return (
    <ContentLayout title="Trend Analysis">
      <TrendAnalysis />
    </ContentLayout>
  );
}
