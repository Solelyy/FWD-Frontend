import Header from "@/components/layout/Header";
import ForgotPasswordForm from "./ForgotPassword";

export default function ForgotPasswordPage() {
    return (
        <div className="hero-section mt-5 flex flex-col gap-8">
            <Header />
            <main className="flex w-full flex-col items-center justify-start px-6 pb-16">
                <div className="mt-4 w-full max-w-md sm:mt-5 md:max-w-lg">
                    <ForgotPasswordForm />
                </div>
            </main>
        </div>
    );
}