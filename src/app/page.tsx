export const dynamic = "force-dynamic";

import Login  from "@/features/auth/components/LoginForm";
import Header from "@/components/layout/Header";
import { redirect } from "next/navigation";
import { UserRole } from "@/lib/types/roles";
import { getAuthUserCache } from "@/features/auth/server/auth";

export default async function Home() {
  const user = await getAuthUserCache();

  if (user) {
    switch (user.role) {
      case UserRole.ADMIN: redirect("/admin");
      case UserRole.SUPER_ADMIN: redirect("/super-admin");
      case UserRole.EMPLOYEE: redirect("/employee");
    }
  }

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
