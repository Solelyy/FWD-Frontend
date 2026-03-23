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
  role: AccountInfo["role"]
}

interface SuspendAccountVariables extends UpdateAccountVariables {
  startDate: string, 
  endDate:string
}

type ResendInviteVariable = {
  email: AccountInfo["email"]
  role: AccountInfo["role"]
}

type RemoveAccountVariable = {
  employeeId: AccountInfo["employeeId"],
  role: AccountInfo["role"]
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
    mutationFn: ({employeeId}: RemoveAccountVariable)=> 
      removeAccountApi({employeeId}),
    onSuccess: (_, {role}) => queryClient.invalidateQueries({ queryKey: ["accounts", role] }),
  });

  const resendInvite = useMutation({
    mutationFn: ({email}: ResendInviteVariable) => 
      resendInviteApi({email}),
    onSuccess: (_, {role}) => {
      queryClient.invalidateQueries({ queryKey: ["accounts", role] })
    }
  });

  return {
    updateStatus,
    suspendAccount,
    removeAccount,
    resendInvite,
  };
}