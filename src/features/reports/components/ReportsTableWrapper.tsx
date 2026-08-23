"use client"
import SearchBar from "@/components/shared/SearchBar";
import DatePicker from "@/app/(protected)/admin/leave/components/DatePicker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

type ReportsTableWrapperProps = {
    title: string;
    description: string;
    table: React.ReactNode;
}

export default function ReportsTableWrapper({title, description, table} : ReportsTableWrapperProps) {
    const [searchTerm, setSearchTerm] = useState("");
    
    return ( 
        <Card>
            <CardHeader>
                <CardTitle>
                    {title}
                </CardTitle>
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <CardDescription>{description}</CardDescription>
                    <div className="flex gap-2">
                        <DatePicker />
                        <SearchBar value={searchTerm} onChange ={setSearchTerm} />
                    </div>
                </div>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
                {table}
            </CardContent>
        </Card>
    )
}