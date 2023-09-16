import { API } from "@/api";
import { IProjectWithLatestDeployment } from "@/api/project/types";
import { useQuery } from "@tanstack/react-query";

export const useProject = ({ projectName }: { projectName: string }) =>
  useQuery({
    queryKey: ["projects", projectName],
    queryFn: async () => {
      try {
        const response = await API.project.getProject({ projectName });
        return response.data.project as IProjectWithLatestDeployment;
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
