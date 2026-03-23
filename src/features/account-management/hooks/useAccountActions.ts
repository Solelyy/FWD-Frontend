import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAccountStatusApi } from "../api/updateAccountStatusApi";
import { suspendAccountApi } from "@/features/account-management/api/suspendAccountApi";
import { removeAccountApi } from "../api/removeAccountApi";
import { resendInviteApi } from "../api/resendInviteApi";
import { AccountInfo, Status } from "../types/account";
import { toast } from "sonner";

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
  const errorMsg = "Unable to do the action, please try again."

  const updateStatus = useMutation({
    mutationFn: ({employeeId, status, }: UpdateAccountVariables)=> 
      updateAccountStatusApi({employeeId, status}),
    onSuccess: (_, {role, status}) => {
      toast.success (
        status === Status.INACTIVE
        ? "Account successfully inactivated."
        : "Account sucessfully activated"
      );

      queryClient.invalidateQueries({ 
        queryKey: ["accounts", role],
        refetchType: "active" 
      });
    },

    onError: () => {
      toast.error(errorMsg)
    }
  });

  const suspendAccount = useMutation({
    mutationFn: ({employeeId, status, startDate, endDate} : SuspendAccountVariables) =>
    suspendAccountApi({employeeId, status, startDate, endDate}),
    onSuccess: (_, {role}) => {
      toast.success("Account successfully suspended.")
      queryClient.invalidateQueries({ 
        queryKey: ["accounts", role],
        refetchType: "active" 
      });
    },
    onError: () => {
      toast.error(errorMsg)
    }
  });

  const removeAccount = useMutation({
    mutationFn: ({employeeId}: RemoveAccountVariable)=> 
      removeAccountApi({employeeId}),
    onSuccess: (_, {role}) => {
      toast.success("Account successfully removed.")
      queryClient.invalidateQueries({ 
        queryKey: ["accounts", role],
        refetchType: "active"
      })
    },
    onError: () => {
      toast.error(errorMsg)
    }
  });

  const resendInvite = useMutation({
    mutationFn: ({email}: ResendInviteVariable) => 
      resendInviteApi({email}),
    onSuccess: (_, {role}) => {
      toast.success("Email invitation is sent successfully.")
      queryClient.invalidateQueries({ 
        queryKey: ["accounts", role],
        refetchType: "active"
      })
    },
    onError: () => {
      toast.error(errorMsg)
    }
  });

  return {
    updateStatus,
    suspendAccount,
    removeAccount,
    resendInvite,
  };
}