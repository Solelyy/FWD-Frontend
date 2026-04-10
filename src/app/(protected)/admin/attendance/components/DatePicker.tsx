import { Calendar } from "lucide-react"
export default function DatePicker() {
    return (
        <div className="flex gap-2 items-center">
            <p className="text-sm text-nowrap">Filter by</p>
            <div className="border rounded py-2 px-4 flex gap-15 items-center">
                <p className="text-sm">Today</p>
                <Calendar size={15}/>
            </div>
        </div>
    );
}