import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Unlink } from "lucide-react";
 
export default function InvitationExpired() {

  return (
    <div className="flex flex-col gap-6 items-center">
        <Card className="h-full w-full max-w-sm sm:max-w-md md:max-w-lg py-8 px-6 sm:py-10 text-center">
          <CardHeader>
            <div className="flex items-center justify-center">
                <Unlink size={40} color="oklch(63.7% 0.237 25.331)"/>   
            </div>
            
            <CardTitle className="text-2xl text-red-500">Invalid Invitation</CardTitle>
            <CardDescription className="mt-5 mb-10 text-md">
              Sorry, this invitation link is no longer valid. Please contact the admin or super admin.
            </CardDescription>
          </CardHeader>
          <CardContent>
        </CardContent>
      </Card>
    </div>
  );
}