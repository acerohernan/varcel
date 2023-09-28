import { z } from "zod";

export const GetGhIntegrationStatusDTO = z.object({
  userId: z.string().nonempty(),
});

export type TGetGhIntegrationStatusDTO = z.infer<
  typeof GetGhIntegrationStatusDTO
>;
