import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent} from "@/components/ui/card"

import { UsersRound, CircleSmall } from "lucide-react";
/*type CardLayoutProps = {
    title: string;
    icon: React.ReactNode;
    data: number;
    metadata: string
    
    {title, icon, data, metadata} : CardLayoutProps
}*/

export function CardLayout() {
    return (
        <Card className="w-50 h-40 text-center">
            <CardHeader>
                <CardTitle>Admin Accounts</CardTitle>
            </CardHeader>

            <CardContent className="flex gap-4 items-center justify-center">
                <UsersRound />
                <CardTitle className="text-2xl">2</CardTitle>
            </CardContent>

            <CardDescription className="flex mx-auto">
                <CircleSmall className="text-green-500 fill-green-500" />
                No current requests
            </CardDescription>

        </Card>
    );
}