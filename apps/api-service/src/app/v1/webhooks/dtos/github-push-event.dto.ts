import { z } from "zod";

export const GithubPushEventDTO = z.object({
  ref: z.string().nonempty(),
  after: z.string().nonempty(),
  installation: z.object({
    id: z.number().nonnegative(),
  }),
  repository: z.object({
    full_name: z.string().nonempty(),
  }),
});

export type TGithubPushEventDTO = z.infer<typeof GithubPushEventDTO>;
