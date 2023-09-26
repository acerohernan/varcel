import { z } from "zod";

export const GithubRepositoryWebhookDTO = z.object({
  installation: z.object({
    id: z.number().nonnegative(),
  }),
  repository: z.object({
    full_name: z.string().nonempty(),
  }),
});

export type TGithubRepositoryWebhookDTO = z.infer<
  typeof GithubRepositoryWebhookDTO
>;
