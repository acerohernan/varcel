import { API } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useUser = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: API.user.getUser,
    retry: 1,
  });
