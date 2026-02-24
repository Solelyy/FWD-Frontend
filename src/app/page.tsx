import { Login } from "@/components/features/LoginForm";

export default function Home() {
  return (
    <>
      <main className="flex w-full flex-col items-center justify-start px-6 pb-16">
        <div  className="w-full max-w-md">
          <Login />
        </div>
      </main>
    </>
  );
}
