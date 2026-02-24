import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function GoogleButton() {
  return (
    <Button
      variant="outline"
      type="button"
      className="w-full flex items-center justify-center gap-2 mt-4"
    >
      <Image
        src="/google-logo.svg"
        alt="Google logo"
        width={20}
        height={20}
      />
      Continue with Google
    </Button>
  )
}