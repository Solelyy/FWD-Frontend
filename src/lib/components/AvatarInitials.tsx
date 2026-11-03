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
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/15 bg-primary/10 text-sm font-semibold text-primary">
            {initials}
        </div>
    );
}