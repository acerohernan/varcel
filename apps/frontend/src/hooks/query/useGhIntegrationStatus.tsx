import { API } from "@/api";
import { IGhIntegrationStatus } from "@/api/user/types";
import { useQuery } from "@tanstack/react-query";

export const useGhIntegrationStatus = () =>
  useQuery({
    queryKey: ["user", "integrations", "github"],
    queryFn: async () => {
      try {
        const response = await API.user.getGhIntegrationStatus();
        return response.data.status as IGhIntegrationStatus;
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
