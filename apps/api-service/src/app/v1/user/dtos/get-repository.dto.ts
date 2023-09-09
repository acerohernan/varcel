import { z } from "zod";

export const GetRepositoryDTO = z.object({
  userId: z.string().nonempty(),
  repoOwner: z.string().nonempty(),
  repoName: z.string().nonempty(),
});

export type TGetRepositoryDTO = z.infer<typeof GetRepositoryDTO>;
