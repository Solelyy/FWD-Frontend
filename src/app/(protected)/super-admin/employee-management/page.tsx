import { ContentLayout } from "@/components/layout/panel/content-layout";
import EmployeeList from "./EmployeeManagement";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Employee Management"
}

export default function EmployeeListPage() {
  return (
    <ContentLayout title="Employee Management">
      <EmployeeList />
    </ContentLayout>
  );
}
