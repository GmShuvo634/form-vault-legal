import { logout } from "@/services/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(["auth", "user"], null);
      queryClient.setQueryData(["posts"], null);
    },
  });
};