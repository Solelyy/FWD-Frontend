"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Field, FieldGroup, FieldLabel} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form";
import { FormMessage } from "@/components/ui/form-message";
import { registerSchema } from "@/features/auth/util/password-validation";
import type { RegisterSchema } from "@/features/auth/util/password-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { setPassword } from "@/features/auth/api/invitationApi"
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type InvitationValues = {
    employeeId: string
    token: string
}

export default function SetPasswordForm({token, employeeId } : InvitationValues){
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isSubmitting}} = 
    useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema)
    });

    const onSubmit = async (data: RegisterSchema) => {
        try {
            await setPassword(token, data.password);
            toast.success("Your account has been activated! Redirecting you to login...")
            setTimeout(() => {
                router.replace("/");
            }, 3000);
            
        } catch(err: unknown) {
        if (err instanceof Error) {
            toast.error(err.message);
        } else {
            toast.error("Something went wrong");
        }
        }
    }
    //show/unhide passwords
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="flex flex-col gap-6 items-center">
            <Card className="h-full w-full max-w-sm sm:max-w-md md:max-w-lg py-8 px-6 sm:py-10">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl sm:text-2xl">Activate Your Account</CardTitle>
                    <CardDescription>Set your password to activate your FWD Portal account.</CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="employeeId">Employee ID</FieldLabel>
                                <Input id="employeedId" value={employeeId} readOnly 
                                className="bg-muted cursor-not-allowed"/>
                            </Field> 

                            <Field>
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                <div className="relative">
                                    <Input type={showPassword ? "text" : "password"}
                                    id="password"
                                    autoComplete="new-password"
                                    {...register("password")}
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
                                {errors.password && (
                                    <FormMessage variant="error" message= {errors.password.message}/>
                                )}
                            </Field> 

                            <Field>
                                <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                                <div className="relative">
                                    <Input 
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    autoComplete="new-password"
                                    {...register("confirmPassword")}
                                    />

                                    <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                    >
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <FormMessage variant="error" message={errors.confirmPassword.message}/>)}
                            </Field> 

                            <Field>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? "Activating..." : "Activate Account"}
                                </Button>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}