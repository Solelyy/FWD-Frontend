import SignupForm from "@/components/shared/features/SignupForm";

export default function SignUp() {
    return (
        <>
        <main className="flex w-full flex-col items-center justify-start px-6 pb-16">
            <div className="w-full max-w-md">
                <SignupForm />
            </div>
        </main>
        
        </>
    );
}