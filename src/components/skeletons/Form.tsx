import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card";

export function SkeletonForm() {
  return (
    <div className="flex flex-col gap-6 items-center">
        <Card className="h-full w-full max-w-sm sm:max-w-md md:max-w-lg py-8 px-6 sm:py-10 text-center">
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-3">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-full" />
          </div>
          <div className="flex flex-col gap-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-full" />
          </div>
          <div className="flex flex-col gap-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-full" />
          </div>
          <Skeleton className="h-8 w-40" />
        </div>
      </Card>
    </div>
  )
}
