import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/shared/ui/card"
import {Field, FieldGroup, FieldLabel} from "@/components/shared/ui/field"
import { Input } from "@/components/shared/ui/input"
import { Button } from "@/components/shared/ui/button"
import { useForm } from "react-hook-form";
import { FormMessage } from "../ui/form-message";
import { registerSchema } from "@/lib/util/password-validation";
import type { RegisterSchema } from "@/lib/util/password-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { setPassword } from "@/lib/api/authApi.ts/invitation"
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
            toast.success("Account created successfully! Please login.")
            setTimeout(() => {
                router.replace("/"); // redirect to landing page
            }, 1500);
            
        } catch(err: any) {
            console.error(err);
            toast.error(err.message || "Something went wrong");
        }
    }

    //show/unhide passwords
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="flex flex-col gap-6">
            <Card className="h-full py-10 px-6">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Create your Account</CardTitle>
                    <CardDescription>Please set your password</CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="employeeId">Employee ID</FieldLabel>
                                <Input value={employeeId} readOnly/>
                            </Field> 

                            <Field>
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                <div className="relative">
                                    <Input type={showPassword ? "text" : "password"}
                                    id="password"
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
                                    {...register("confirmPassword")}
                                    />

                                    <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
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
                                    {isSubmitting ? "Creating Account..." : "Create Account"}
                                </Button>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}