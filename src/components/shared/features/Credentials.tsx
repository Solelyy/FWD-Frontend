import { UseFormReturn } from "react-hook-form"
import { SignupFormValues } from "./SignupForm"

import {
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shared/ui/card"

import {
  Field,
  FieldLabel,
  FieldDescription,
} from "@/components/shared/ui/field"

import { Input } from "@/components/shared/ui/input"
import { Button } from "@/components/shared/ui/button"
import Link from "next/link"

type Props = {
  form: UseFormReturn<SignupFormValues>
  onBack: () => void
  onSubmit: () => void
  loading: boolean
}

export default function CredentialsStep({ form, onBack, onSubmit, loading }: Props) {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Set your credentials
        </CardTitle>
      </CardHeader>

      <CardContent>
      <Field className="mt-4">
        <FieldLabel>Email</FieldLabel>
        <Input type="email" {...form.register("email")} />
        <p className="text-red-500 text-sm">
          {form.formState.errors.email?.message}
        </p>
      </Field>

      <Field className="mt-4">
        <FieldLabel>Password</FieldLabel>
        <Input type="password" {...form.register("password")} />
        <p className="text-red-500 text-sm">
          {form.formState.errors.password?.message}
        </p>
      </Field>

      <Field className="mt-4">
        <FieldLabel>Confirm Password</FieldLabel>
        <Input type="password" {...form.register("confirmPassword")} />
        <p className="text-red-500 text-sm">
          {form.formState.errors.confirmPassword?.message}
        </p>
      </Field>
      
      <Field>
      <div className="flex gap-4 mt-6">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button onClick={onSubmit} disabled={loading} className="flex-1">
          {loading ? "Creating..." : "Create Account"}
        </Button>
      </div>

      <FieldDescription className="text-center mt-4">
        Already have an account?{" "}
        <Link href="/" className="text-primary">
          Login
        </Link>
      </FieldDescription>
      </Field>
      </CardContent>
    </>
  )
}