"use client"

import { Button } from "@/components/shared/ui/button"
import Link from "next/link"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/shared/ui/card"
import {Field, FieldDescription, FieldGroup, FieldLabel} from "@/components/shared/ui/field"
import { Input } from "@/components/shared/ui/input"
import {useForm} from "react-hook-form"
import { FormMessage } from "@/components/shared/ui/form-message"
import { useAutoDismiss } from "@/lib/hooks/useAutoDismiss"
import { useRouter } from "next/navigation"
import { loginAuth, getUser } from "@/lib/api/authApi.ts/login"
import { getAuthError } from "@/lib/util/authError"
import type { LoginCredentials } from "@/lib/types/roles"
import { UserRole } from "@/lib/types/roles"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const router = useRouter();
  const {register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginCredentials>();

  const [errorMsg, setErrorMsg] = useAutoDismiss<string>();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginCredentials) => {
    try {
      const loginError = await loginAuth(data);

      if (loginError) {
        setErrorMsg(loginError)
        return
      }

      const { user, error }= await getUser();

      if (error || !user ) {
        setErrorMsg(error ?? getAuthError("other"))
        return
      }
      
      //redirect based on role
      if (user.role === UserRole.ADMIN) router.replace("/admin");
      else if (user.role === UserRole.SUPER_ADMIN) router.replace("/super-admin")
      else if (user.role === UserRole.EMPLOYEE) router.replace("/employee")
      else setErrorMsg(getAuthError("other"));
    } catch (err) {
      console.error("Login error: ", err)
      setErrorMsg(getAuthError("other"))
    }
  }
  
  return (
    <div className="flex flex-col gap-6 items-center">
      <Card className="h-full w-full max-w-sm sm:max-w-md md:max-w-lg py-8 px-6 sm:py-10">
        <CardHeader className="text-center">
          <CardTitle className="text-xl sm:text-2xl">Sign in to FWD</CardTitle>
          <CardDescription className="text-sm">Please enter your credentials below. </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="employeeId">Employee ID</FieldLabel>
                <Input
                  id="employeeId"
                  type="text"
                  placeholder="FWD1234"
                  {...register("employeeId", {
                    required: "Employee ID is required",
                  })}
                />
                {errors.employeeId && <FormMessage variant="error" message={errors.employeeId.message}/>}
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline hover:text-primary"
                  >
                    Forgot your password?
                  </Link>
                </div>

                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"}
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
                <Button type="submit" disabled={isSubmitting}> {isSubmitting? "Logging in..." : "Log in"}</Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
  