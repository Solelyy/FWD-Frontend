import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAccountStatusApi } from "../api/updateAccountStatusApi";
import { suspendAccountApi } from "@/features/account-management/api/suspendAccountApi";
import { removeAccountApi } from "../api/removeAccountApi";
import { resendInviteApi } from "../api/resendInviteApi";
import { AccountInfo, Status } from "../types/account";
import { UserRole } from "@/lib/types/roles";

interface UpdateAccountVariables  {
  employeeId: AccountInfo["employeeId"],
  status: Status
  role: UserRole
}

interface SuspendAccountVariables extends UpdateAccountVariables {
  startDate: string, 
  endDate:string
}


export function useAccountActions() {
  const queryClient = useQueryClient();

  const updateStatus = useMutation({
    mutationFn: ({employeeId, status, }: UpdateAccountVariables)=> 
      updateAccountStatusApi({employeeId, status}),
    onSuccess: (_, {role}) => {
      queryClient.invalidateQueries({ queryKey: ["accounts", role], });
    },
  });

  const suspendAccount = useMutation({
    mutationFn: ({employeeId, status, startDate, endDate} : SuspendAccountVariables) =>
    suspendAccountApi({employeeId, status, startDate, endDate}),
    onSuccess: (_, {role}) => {
      queryClient.invalidateQueries({ queryKey: ["accounts", role] });
    }
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