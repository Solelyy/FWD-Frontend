export const dynamic = "force-dynamic";

import Login  from "@/features/auth/components/LoginForm";
import Header from "@/components/layout/Header";
import { redirect } from "next/navigation";
import { UserRole } from "@/lib/types/roles";
import { getAuthUserCache } from "@/features/auth/server/auth";
import { testGetAuthUser } from "@/features/auth/server/testAuth";

export default async function Home() {
  const user = await getAuthUserCache();
  /*const user = await testGetAuthUser(); */

  if (user) {
    switch (user.role) {
      case UserRole.ADMIN: redirect("/admin");
      case UserRole.SUPER_ADMIN: redirect("/super-admin");
      case UserRole.EMPLOYEE: redirect("/employee");
    }
  }

  return (
    <div className="hero-section flex min-h-screen flex-col gap-8 px-4 pt-5 sm:px-6">
      <Header />
      <main className="flex w-full flex-1 flex-col items-center justify-center px-2 pb-12 sm:px-0 sm:pb-20">
        <div className="w-full max-w-md md:max-w-lg">
          <Login /> 
        </div>
      </main>
    </div>
  );
}
