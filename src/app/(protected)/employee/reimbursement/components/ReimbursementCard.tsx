import CardContainer from "@/components/shared/CardContainer";
import { CardLayoutV2 } from "@/components/shared/CardLayoutV2";
import { ReimbursementSummary } from "../types/reimbursement";
import { PhilippinePesoIcon } from "lucide-react";

type Props = {
    data?: ReimbursementSummary
}
export default function ReimbursementCard({data} : Props) {
    return(
        <CardContainer title="Reimbursement Summary">
            <CardLayoutV2 title="Total Approved" showDecimal={true} dataCount={data?.totalApproved ?? 0} icon={<PhilippinePesoIcon size={25}/>}/>
            <CardLayoutV2 title="Total Pending" showDecimal={true} dataCount={data?.totalPending ?? 0} icon={<PhilippinePesoIcon size={25}/>}/>
        </CardContainer>
    );
}