import { useQuery } from "@tanstack/react-query";

import { API } from "@/api";
import { IGitRepository } from "@/api/user/types";

export const useRepositories = () =>
  useQuery({
    queryKey: ["user", "repositories"],
    queryFn: async () => {
      try {
        const response = await API.user.getGitRepositories();
        return response.data.repositories as IGitRepository[];
      } catch (error) {
        throw error;
      }
    },
    retry: 1,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retryOnMount: false,
  });
