import { useQuery } from "@tanstack/react-query";

import { API } from "@/api";
import { IProject } from "@/api/project/types";

export const useProjects = () =>
  useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      try {
        const response = await API.project.getProjects();
        return response.data.projects as IProject[];
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
