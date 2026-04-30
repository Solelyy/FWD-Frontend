import { AccountInfo } from "@/features/account-management/types/account"
type Props = {
    firstname: AccountInfo["firstname"];
    lastname: AccountInfo["lastname"];
}
export default function AvatarInitials({firstname, lastname}: Props) {
    const initialFirstname = firstname?.charAt(0);
    const initialLastname = lastname?.charAt(0);

    const initials = `${initialFirstname}${initialLastname}`
    
    return (
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-200 text-blue-900 font-semibold text-sm">
            {initials}
        </div>
    );
}