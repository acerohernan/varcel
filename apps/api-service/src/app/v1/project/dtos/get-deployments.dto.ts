import { z } from "zod";

export const GetDeploymentsDTO = z.object({
  userId: z.string().nonempty(),
  projectName: z.string().nonempty(),
  page: z.number().nonnegative().max(100),
  perPage: z.number().nonnegative().max(5),
});

export type TGetDeploymentsDTO = z.infer<typeof GetDeploymentsDTO>;
