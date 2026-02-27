import { Login } from "@/components/features/LoginForm";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="hero-section">
      <Header />
      <main className="flex w-full flex-col items-center justify-start px-6 pb-16">
        <div  className="w-full max-w-md">
          <Login /> 
        </div>
      </main>
    </div>
  );
}
