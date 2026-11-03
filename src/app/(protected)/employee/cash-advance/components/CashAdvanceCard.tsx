import CardContainerRequests from "@/components/shared/CardContainerRequests";
import { CardLayoutV2 } from "@/components/shared/CardLayoutV2";
import { CashAdvanceSummary } from "../types/cash-advance";
import { PhilippinePesoIcon } from "lucide-react";

type Props = {
    data?: CashAdvanceSummary
}
export default function CashAdvanceCard({data} : Props) {
    return(
        <CardContainerRequests title="Cash Advance Summary" gridClassName="grid-cols-1">
            <CardLayoutV2 title="Total Advanced" showDecimal={true} dataCount={data?.totalAdvanced ?? 0} icon={<PhilippinePesoIcon size={25}/>} iconTone="blue"/>
        </CardContainerRequests>
    );
}