"use client"

import { cn } from "@/lib/util/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Field, FieldDescription, FieldGroup, FieldLabel} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {useForm} from "react-hook-form"
import { FormMessage } from "@/components/ui/form-message"
import { useAutoDismiss } from "@/lib/hooks/useAutoDismiss"
import { useRouter } from "next/navigation"
import { loginAuth, getUser } from "@/lib/api/authApi.ts/login"
import { getAuthError } from "@/lib/util/authError"

type LoginForm = {
  employeeId: string
  password: string
}

export function Login({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const {register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>();

  const [errorMsg, setErrorMsg] = useAutoDismiss<string>();

  const onSubmit = async (data: LoginForm) => {
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
      if (user.role === 'ADMIN') router.replace("/dashboard/admin");
      else if (user.role === 'SUPER_ADMIN') router.replace("/dashboard/super-admin")
      else if (user.role === "EMPLOYEE") router.replace(`/dashboard/employee/${user.employeeId}`)
      else setErrorMsg(getAuthError("other"));
    } catch (err) {
      console.error("Login error: ", err)
      setErrorMsg(getAuthError("other"))
    }
  }
  
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="h-full py-10 px-6">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Sign in to FWD</CardTitle>
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
                <Input 
                id="password" 
                type="password" 
                {...register("password", {required: "Password is required",
                })} />
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
  )
}