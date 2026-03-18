import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAccountStatus } from "../api/updateAccountStatusApi";
import { suspendAccountApi } from "@/features/account-management/api/suspendAccountApi";
import { removeAccountApi } from "../api/removeAccountApi";
import { resendInviteApi } from "../api/resendInviteApi";

import { AccountInfo, Status } from "../types/account";

export type UpdateAccountVariables = {
  employeeId: AccountInfo["employeeId"];
  status: Status;
};

export function useAccountActions() {
  const queryClient = useQueryClient();

  const updateStatus = useMutation({
    mutationFn: updateAccountStatus,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["accounts"] }),
  });

  const suspendAccount = useMutation({
    mutationFn: suspendAccountApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["accounts"] }),
  });

  const removeAccount = useMutation({
    mutationFn: removeAccountApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["accounts"] }),
  });

  const resendInvite = useMutation({
    mutationFn: resendInviteApi,
  });

  return {
    updateStatus,
    suspendAccount,
    removeAccount,
    resendInvite,
  };
}