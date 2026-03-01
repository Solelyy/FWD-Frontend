import { Login } from "@/components/shared/features/LoginForm";
import Header from "@/components/shared/layout/Header";

export default function Home() {
  return (
    <div className="hero-section pt-6 flex flex-col gap-8">
      <Header />
      <main className="flex w-full flex-col items-center justify-start px-6 pb-16">
        <div  className="w-full max-w-md">
          <Login /> 
        </div>
      </main>
    </div>
  );
}
