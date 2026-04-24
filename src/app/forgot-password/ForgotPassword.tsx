import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordForm() {
	return (
		<div className="flex flex-col items-center gap-6 lg:gap-8">
			<Card className="h-full w-full max-w-sm px-6 py-8 sm:max-w-md sm:py-10 md:max-w-lg lg:py-14">
				<CardHeader className="text-center">
					<CardTitle className="text-xl sm:text-2xl lg:text-3xl">Forgot Password</CardTitle>
					<CardDescription className="text-sm lg:text-base">
						Enter your email and we will send password reset instructions.
					</CardDescription>
				</CardHeader>

				<CardContent>
					<form className="space-y-4">
						<FieldGroup className="lg:gap-7">
							<Field>
								<FieldLabel className="lg:text-base" htmlFor="email">Email Address</FieldLabel>
								<Input
									className="lg:h-11 lg:text-base"
									id="email"
									name="email"
									type="email"
									placeholder="juandelacruz@gmail.com"
									autoComplete="email"
								/>
							</Field>

							<Button className="lg:h-11 lg:text-base" type="button">Send Reset Link</Button>

							<Button className="lg:h-11 lg:text-base" type="button" variant="ghost" asChild>
								<Link href="/">Back to Login</Link>
							</Button>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
