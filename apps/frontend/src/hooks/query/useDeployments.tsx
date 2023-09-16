import { useQuery } from "@tanstack/react-query";

import { API } from "@/api";
import { IDeployment } from "@/api/deployment/types";

export const useDeployments = ({ projectId }: { projectId: string }) =>
  useQuery({
    queryKey: [projectId, "deployments"],
    queryFn: async () => {
      try {
        const response = await API.project.getDeployments({ projectId });
        return response.data.deployment as IDeployment[];
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
