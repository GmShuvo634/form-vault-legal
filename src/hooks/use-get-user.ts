import { getUser } from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = () =>
  useQuery({
    queryKey: ["auth", "user"],
    queryFn: getUser,
    retry: false,
  });