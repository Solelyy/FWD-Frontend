"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Field, FieldDescription, FieldGroup, FieldLabel} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {useForm} from "react-hook-form"
import { FormMessage } from "@/components/ui/form-message"
import { useAutoDismiss } from "@/lib/hooks/useAutoDismiss"
import { loginAuth, } from "@/features/auth/api/loginApi"
import { getAuthError } from "@/features/auth/util/auth-error"
import type { LoginCredentials } from "@/lib/types/auth-user"
import { UserRole } from "@/lib/types/roles"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation"
import { useUser } from "@/components/providers/UserContext"

export default function Login() {
  const { setUser } = useUser();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const {register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginCredentials>();

  const [errorMsg, setErrorMsg] = useAutoDismiss<string>();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginCredentials) => {
    try {
      const {user, error } = await loginAuth(data);
      if (error) {
        setErrorMsg(error);
        console.error("Error:", error);

        return;
      }

      if (!user) {
        setErrorMsg(getAuthError("other"));
        return
      } 

      setUser(user);

      //redirect based on role
      setIsRedirecting(true);
      console.log("Redirecting to dashboard...");
      
      switch (user.role) {
        case UserRole.ADMIN:
          console.log("Redirecting to admin...")
          await router.replace("/admin");
          break;

        case UserRole.SUPER_ADMIN:
          console.log("Redirecting to super admin...")
          await router.replace("/super-admin");
          break;

        case UserRole.EMPLOYEE:
          console.log("Redirecting to employee...")
          await router.replace("/employee");
          break;
      
        default:
          console.warn("Unknown user role.");
          throw new Error(`Unknown user role: ${user.role}`);
        }
      } catch (err) {
        console.error("Login error: ", err);
    } finally {
      console.log({ isSubmitting, isRedirecting });
    }
  }

  return (
    <div className="flex flex-col items-center gap-6 lg:gap-8">
      <Card className="h-full w-full max-w-sm sm:max-w-md md:max-w-lg px-6 py-8 sm:py-10 lg:py-14">
        <CardHeader className="text-center">
          <CardTitle className="text-xl sm:text-2xl lg:text-3xl">Sign in to FWD</CardTitle>
          <CardDescription className="text-sm lg:text-base">Please enter your credentials below. </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup className="lg:gap-7">
              <Field>
                <FieldLabel htmlFor="employeeId" className="lg:text-base">Employee ID</FieldLabel>
                <Input
                  id="employeeId"
                  type="text"
                  placeholder="FWD1234"
                  className="lg:h-11 lg:text-base"
                  {...register("employeeId", {
                    required: "Employee ID is required",
                  })}
                />
                {errors.employeeId && <FormMessage variant="error" message={errors.employeeId.message}/>}
              </Field>
              <Field>
                <div className="flex items-center justify-center gap-2">
                  <FieldLabel htmlFor="password" className="lg:text-base">Password</FieldLabel>
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:text-primary hover:underline lg:text-base"
                  >
                    Forgot your password?
                  </Link>
                </div>

                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"}
                    className="lg:h-11 lg:text-base"
                    {...register("password", {required: "Password is required",
                    })} 
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <FormMessage variant="error" message={errors.password.message}/>}
              </Field>
              <Field>
                  <FieldDescription className="text-center">
                    {errorMsg && <FormMessage variant="error" message={errorMsg} className="text-center fade-out"/>}
                </FieldDescription>
                <Button className="lg:h-11 lg:text-base" type="submit" disabled={isSubmitting || isRedirecting}> {isSubmitting || isRedirecting? "Logging in..." : "Log in"}</Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}