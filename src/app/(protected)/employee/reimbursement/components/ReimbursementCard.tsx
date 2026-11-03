import CardContainerRequests from "@/components/shared/CardContainerRequests";
import { CardLayoutV2 } from "@/components/shared/CardLayoutV2";
import { ReimbursementSummary } from "../types/reimbursement";
import { PhilippinePesoIcon } from "lucide-react";

type Props = {
    data?: ReimbursementSummary
}
export default function ReimbursementCard({data} : Props) {
    return(
        <CardContainerRequests title="Reimbursement Summary" gridClassName="grid-cols-2 gap-3">
            <CardLayoutV2 title="Total Approved" showDecimal={true} dataCount={data?.totalApproved ?? 0} icon={<PhilippinePesoIcon size={25}/>} iconTone="blue"/>
            <CardLayoutV2 title="Total Pending" showDecimal={true} dataCount={data?.totalPending ?? 0} icon={<PhilippinePesoIcon size={25}/>} iconTone="blue"/>
        </CardContainerRequests>
    );
}