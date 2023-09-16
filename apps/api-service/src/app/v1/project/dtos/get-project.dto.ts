import { z } from "zod";

export const GetProjectDTO = z.object({
  userId: z.string().nonempty(),
  projectName: z.string().nonempty(),
});

export type TGetProjectDTO = z.infer<typeof GetProjectDTO>;
