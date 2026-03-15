import Login  from "@/features/auth/components/LoginForm";
import Header from "@/components/layout/Header";

export default function Home() {
  return (
    <div className="hero-section flex flex-col gap-8">
      <Header />
      <main className="flex w-full flex-col items-center justify-start px-6 pb-16">
        <div  className="w-full max-w-md mt-10 sm:mt-8">
          <Login /> 
        </div>
      </main>
    </div>
  );
}
