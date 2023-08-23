import { z } from "zod";

export const SetupGithubIntegrationDTO = z.object({
  code: z.string(),
  installationId: z.number(),
});

export type TSetupGithubIntegrationDTO = z.infer<
  typeof SetupGithubIntegrationDTO
>;
