import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";

export default function Account() {
    return (
        <div className="space-y-6">
            <ProfileInfo />
            <ChangePassword />
        </div>
    )
}