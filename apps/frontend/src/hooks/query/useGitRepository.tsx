import { useQuery } from "@tanstack/react-query";

import { API } from "@/api";
import { IGitRepository } from "@/api/user/types";

export const useGitRepository = ({ repoUrl }: { repoUrl: string }) =>
  useQuery({
    queryKey: ["user", "repositories", repoUrl],
    queryFn: async () => {
      try {
        const response = await API.user.getGitReposity({ url: repoUrl });
        return response.data.repository as IGitRepository;
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
