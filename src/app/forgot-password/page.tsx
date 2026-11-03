import Header from "@/components/layout/Header";
import ForgotPasswordForm from "./ForgotPassword";

export default function ForgotPasswordPage() {
    return (
        <div className="hero-section flex min-h-screen flex-col gap-8 px-4 pt-5 sm:px-6">
            <Header />
            <main className="flex w-full flex-1 flex-col items-center justify-center px-2 pb-12 sm:px-0 sm:pb-20">
                <div className="w-full max-w-md md:max-w-lg">
                    <ForgotPasswordForm />
                </div>
            </main>
        </div>
    );
}