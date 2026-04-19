import CardContainer from "@/components/shared/CardContainer";
import { CardLayoutV2 } from "@/components/shared/CardLayoutV2";
import { CashAdvanceSummary } from "../types/cash-advance";

type Props = {
    data?: CashAdvanceSummary
}
export default function CashAdvanceCard({data} : Props) {
    return(
        <CardContainer title="Cash Advance Summary">
            <CardLayoutV2 title="Total Advanced" dataCount={data?.totalAdvanced ?? 0}/>
        </CardContainer>
    );
}