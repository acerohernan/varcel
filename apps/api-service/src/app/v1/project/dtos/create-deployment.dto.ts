import { z } from "zod";

export const CreateDeploymentDTO = z.object({
  projectId: z.string().nonempty(),
});

export type TCreateDeploymentDTO = z.infer<typeof CreateDeploymentDTO>;
