"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Card, CardContent } from "@/components/shared/ui/card"

import PersonalStep from "@/components/shared/features/Personal"
import CredentialsStep from "@/components/shared/features/Credentials"
import EmailSentStep from "@/components/shared/features/EmailSent"

const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  employeeId: z.string().min(1, "Employee ID is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

export type SignupFormValues = z.infer<typeof signupSchema>

export default function SignupForm() {
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onTouched",
  })

  const nextStep = async () => {
    const fields =
      step === 0
        ? ["firstName", "lastName", "employeeId"]
        : ["email", "password", "confirmPassword"]

    const valid = await form.trigger(fields as any)

    if (valid) setStep((prev) => prev + 1)
  }

  const prevStep = () => setStep((prev) => prev - 1)

  const onSubmit = async (data: SignupFormValues) => {
    try {
      setLoading(true)

      //replace with backend call
      console.log("Submitting:", data)

      setStep(2)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="h-full py-10 px-6">
          {step === 0 && (
            <PersonalStep form={form} onNext={nextStep} />
          )}

          {step === 1 && (
            <CredentialsStep
              form={form}
              onBack={prevStep}
              onSubmit={form.handleSubmit(onSubmit)}
              loading={loading}
            />
          )}

          {step === 2 && (
            <EmailSentStep email={form.watch("email")} />
          )}
      </Card>
    </div>
  )
}