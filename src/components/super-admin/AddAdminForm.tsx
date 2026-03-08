"use client";

import { Button } from "@/components/shared/ui/button";
import { Field, FieldLabel, FieldGroup } from "@/components/shared/ui/field";
import { Input } from "@/components/shared/ui/input";
import { FormMessage } from "@/components/shared/ui/form-message";
import { AddAdminFormValues } from "@/lib/types/create-admin";

import { useForm } from "react-hook-form";
import { createAdmin } from "@/lib/api/super-admin/create-admin";
import { toast } from "sonner";

type AddAdminFormProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function AddAdminForm({ setOpen }: AddAdminFormProps) {
  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<AddAdminFormValues>();
  const onSubmit = async (data: AddAdminFormValues) => {
    try {
      await createAdmin(data);
      toast.success("Admin created successfully!");
      reset();
      setOpen(false);
    } catch (err: any) {
      if (err.message.includes("Employee ID")) {
        setError("employeeId", { type: "server", message: err.message });
      } else if (err.message.includes("Email")) {
        setError("email", { type: "server", message: err.message });
      } else {
        toast.error(err.message || "Failed to create admin");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FieldGroup>
        <div className="flex flex-col md:flex-row gap-4">
          <Field>
            <FieldLabel>First Name</FieldLabel>
            <Input
              placeholder="Juan"
              {...register("firstname", { required: "First name is required" })}
            />
            {errors.firstname && (
              <FormMessage variant="error" message={errors.firstname.message} />
            )}
          </Field>

          <Field>
            <FieldLabel>Last Name</FieldLabel>
            <Input
              placeholder="Dela Cruz"
              {...register("lastname", { required: "Last name is required" })}
            />
            {errors.lastname && (
              <FormMessage variant="error" message={errors.lastname.message} />
            )}
          </Field>
        </div>

        <Field>
          <FieldLabel>Employee ID</FieldLabel>
          <Input
            placeholder="ex: FWD123"
            {...register("employeeId", { required: "Employee ID is required" })}
          />
          {errors.employeeId && (
            <FormMessage variant="error" message={errors.employeeId.message} />
          )}
        </Field>

        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input
            type="email"
            placeholder="juandelacruz@gmail.com"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <FormMessage variant="error" message={errors.email.message} />
          )}
        </Field>

        <Field>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating Admin..." : "Create Admin"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
