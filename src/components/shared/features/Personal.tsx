import { UseFormReturn } from "react-hook-form"
import { SignupFormValues } from "./SignupForm"

import {
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shared/ui/card"

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/shared/ui/field"

import { Input } from "@/components/shared/ui/input"
import { Button } from "@/components/shared/ui/button"
import Link from "next/link"
import GoogleButton from "@/components/GoogleBtn"

type Props = {
  form: UseFormReturn<SignupFormValues>
  onNext: () => void
}

export default function PersonalStep({ form, onNext }: Props) {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Create your account
        </CardTitle>

        <GoogleButton />
      </CardHeader>

      <p className="text-center text-xs text-black/60">or</p>
      <CardContent>
      <FieldGroup className="grid gap-4 md:grid-cols-2 mt-4">
        <Field>
          <FieldLabel>First name</FieldLabel>
          <Input {...form.register("firstName")} />
          <p className="text-red-500 text-sm">
            {form.formState.errors.firstName?.message}
          </p>
        </Field>

        <Field>
          <FieldLabel>Last name</FieldLabel>
          <Input {...form.register("lastName")} />
          <p className="text-red-500 text-sm">
            {form.formState.errors.lastName?.message}
          </p>
        </Field>
      </FieldGroup>

      <Field className="mt-4">
        <FieldLabel>Employee ID</FieldLabel>
        <Input {...form.register("employeeId")} />
        <p className="text-red-500 text-sm">
          {form.formState.errors.employeeId?.message}
        </p>
      </Field>

      <Field>
      <Button onClick={onNext} className="w-full mt-4">
        Next
      </Button>

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