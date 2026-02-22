import Image from "next/image"
import Link from "next/link"

import {
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { FieldDescription } from "@/components/ui/field"

export default function EmailSentStep({ email }: { email: string }) {
  return (
    <>
      <CardHeader>
        <div className="flex justify-center mb-4">
          <Image
            src="/email-icon.svg"
            alt="Email icon"
            width={40}
            height={40}
          />
        </div>

        <CardTitle className="text-2xl text-center">
          Check your inbox
        </CardTitle>

        <CardDescription className="text-center">
          Click the link we sent to{" "}
          <span className="font-semibold">{email}</span>{" "}
          to finish setting up your account.
        </CardDescription>
      </CardHeader>

      <div className="mt-4 flex flex-col gap-4 items-center">
        <Button
          variant="outline"
          className="flex items-center gap-2"
        >
          <Image
            src="/google-logo.svg"
            alt="Google"
            width={20}
            height={20}
          />
          Open Gmail
        </Button>
        <div className="flex flex-col gap-4 text-center mt-4">
        <FieldDescription>
          No email received?{" "}
          <Link href="#" className="text-primary">
            Resend it
          </Link>
        </FieldDescription>

        <FieldDescription>
          Wrong email address?{" "}
          <Link href="/signup" className="text-primary">
            Create account again
          </Link>
        </FieldDescription>
        </div>
      </div>
    </>
  )
}