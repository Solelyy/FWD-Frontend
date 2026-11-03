import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";

export default function Account() {
    return (
        <div className="mx-auto flex max-w-4xl flex-col gap-6">
            <ProfileInfo />
            <ChangePassword />
        </div>
    )
}