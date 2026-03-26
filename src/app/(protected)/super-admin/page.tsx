"use client"

import { ContentLayout } from "@/components/layout/panel/content-layout";
import {useUser} from "@/components/providers/UserContext"
import { CardLayout } from "@/features/dashboard/components/CardLayout";
import { useSuperAdminDashboardStats } from "@/features/dashboard/hook/useSuperAdminDashboardStats";
import { UsersRound } from "lucide-react";

export default function SuperAdminDashboard() {
    const user = useUser();
    const { totalAdmins, totalEmployees, activeAccounts, isLoading} = useSuperAdminDashboardStats();

    return(
    <ContentLayout title="Dashboard">
        <div className="flex flex-col gap-4">
            <p className="text-xl font-semibold">Good Day, {user.firstname}!</p>
            
            <div className="flex justify-between gap-4">
                <CardLayout 
                title="Total Admins"
                icon= {<UsersRound />}
                dataCount={totalAdmins}
                isLoading = {isLoading}
                />

                <CardLayout 
                title="Total Employees"
                icon= {<UsersRound/>}
                dataCount={totalEmployees}
                isLoading = {isLoading}
                />

                <CardLayout 
                title="Active Accounts"
                icon= {<UsersRound/>}
                dataCount={activeAccounts}
                isLoading = {isLoading}
                />
            </div>
            
            {/*tables */}
            <div>
                
            </div>
        </div>
    </ContentLayout>
    );
}