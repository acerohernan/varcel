import { z } from "zod";

export const CreateDeploymentDTO = z.object({
  userId: z.string().nonempty(),
  projectId: z.string().nonempty(),
});

export type TCreateDeploymentDTO = z.infer<typeof CreateDeploymentDTO>;
