import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { getTodayFormatted } from "@/lib/util/date-format";
import { Button } from "@/components/ui/button";

export default function TimeinOut() {
    return (
        <div className="flex flex-col flex-1">
            <p className="font-light text-sm mb-2">My Attendance Today</p>
            <Card className="flex flex-col h-full">
                <CardHeader>
                    <CardTitle className="flex gap-2 items-center justify-start">
                        <Clock size={15}/>
                        {getTodayFormatted()}
                    </CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col gap-4">
                    <div className="flex gap-4 w-full justify-between">
                        <div className="w-full">
                            <Button className="w-full">
                                Time In
                            </Button>
                        </div>

                        <div className="w-full">
                            <Button className="w-full" disabled>
                                Time Out
                            </Button>
                        </div>
                    </div> 


                    <div className="border rounded p-2">
                        <div className="flex justify-between">
                            <CardDescription>Time In</CardDescription>  
                            <Button size="xs" className="px-4" variant="secondary">View</Button>
                        </div>
                        
                        <p className="text-sm">No record yet</p>
                    </div>

                    <div className="border rounded p-2">
                        <div className="flex justify-between">
                            <CardDescription>Time Out</CardDescription>  
                            <Button size="xs" className="px-4" variant="secondary">View</Button>
                        </div>
                        
                        <p className="text-sm">No record yet</p>
                    </div>   
                </CardContent>
            </Card>
        </div>
    );
}