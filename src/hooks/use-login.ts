import { login } from "@/services/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) =>
      login(username, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "user"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};