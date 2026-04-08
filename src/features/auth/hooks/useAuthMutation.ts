"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptDataPolicyApi } from "@/features/dashboard/api/acceptDataPolicyApi";
import { useUser } from "@/components/providers/UserContext";
import { AuthUser } from "@/lib/types/auth-user";

export function useAcceptDataPolicy() {
  const { setUser } = useUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: acceptDataPolicyApi,

    onSuccess: (updatedUser) => {
      setUser(updatedUser);
      queryClient.setQueryData(["authUser"], updatedUser);
    },
  });
}