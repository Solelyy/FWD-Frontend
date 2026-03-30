import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMonthYear } from "@/lib/util/date-format";
import { Calendar } from "lucide-react";
export default function Requests() {
    return (
        <div className="flex flex-col flex-1">
            <p className="font-light text-sm mb-2">My Requests</p>

           <Card className="flex flex-col h-full">
                <CardHeader>
                    <CardTitle className="flex gap-2 items-center justify-start">
                        <Calendar size={15}/>
                        {getMonthYear(new Date())}
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="border rounded p-2">
                        <p className="text-sm text-center">No records yet</p>
                    </div>
                </CardContent>
            </Card> 
        </div>
    );
}