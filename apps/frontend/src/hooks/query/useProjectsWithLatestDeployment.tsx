import { useQuery } from "@tanstack/react-query";

import { API } from "@/api";
import { IProjectWithLatestDeployment } from "@/api/project/types";

export const useProjectsWithLatestDeployment = () =>
  useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      try {
        const response = await API.project.getProjects();
        return response.data.projects as IProjectWithLatestDeployment[];
      } catch (error: any) {
        throw new Error(error);
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
