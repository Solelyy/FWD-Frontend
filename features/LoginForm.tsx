"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {Field, FieldDescription, FieldGroup, FieldLabel,} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {useForm} from "react-hook-form"
import { FormMessage } from "@/components/ui/form-message"
import { useRouter } from "next/navigation"
import { useAutoDismiss } from "@/hooks/useAutoDismiss"

type LoginForm = {
  employeeId: string
  password: string
}

export function Login({
  className,
  ...props
}: React.ComponentProps<"div">) {
const router = useRouter();
const {register, handleSubmit, formState:{errors, isSubmitting},} = useForm<LoginForm>();

const authError = {
  default: "Incorrect employee ID or password.",
  locked: "Maximum login attempts reached. Account locked for 15 minutes.",
  other: "Something went wrong. Please try again.",
}

const [errorMsg, setErrorMsg] = useAutoDismiss<string>();

const onSubmit = async (data: LoginForm) => {
  setErrorMsg(null);
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    //development only
    console.log(response);

    if (!response.ok) {
      let errorMessage;
      
      if (response.status === 403) {
        //account locked
        errorMessage = authError.locked
      } else if (response.status === 401) {
        //invalid credentials
        errorMessage = authError.default
      } else {
        //other error: connection, server
        errorMessage = authError.other
      }

      setErrorMsg(errorMessage);
      return;
    }

    const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`,{
      method: 'GET',
      credentials: "include",
    });

    if(!userResponse.ok) {
      setErrorMsg(authError.other);
      return;
    }

    const user = await userResponse.json();
    //for develpment only
    console.log(user);

    //redirect based on role
    if (user.role === 'ADMIN') {
      router.replace("/dashboard/admin");
    } else if (user.role === 'SUPER ADMIN') {
      router.replace("/dashboard/super-admin")
    } else if (user.role === "EMPLOYEE") {
      router.replace(`/dashboard/employee/${user.employeeId}`)
    } else {
      setErrorMsg(authError.other);
    }

  } catch {
    setErrorMsg(authError.other);
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
                  <FieldDescription>
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