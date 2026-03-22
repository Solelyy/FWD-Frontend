import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAccount } from "@/features/account-management/api/addAccountApi";
import { UserRole } from "@/lib/types/roles";
import { AddAccountFormValues } from "@/features/account-management/types/add-account";

type CreateAccountVariables = {
  data: AddAccountFormValues;
  role: UserRole.ADMIN | UserRole.EMPLOYEE;
};

export function useCreateAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, role }: CreateAccountVariables) =>
      createAccount(data, role),
    onSuccess: (_, { role }) => {
      // Invalidate the accounts query for this role so the table auto-refreshes
      queryClient.invalidateQueries({ queryKey: ["accounts", role] });
    },
  });
}