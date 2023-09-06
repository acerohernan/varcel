import { z } from "zod";

export const GetProjectsDTO = z.object({
  userId: z.string().nonempty(),
  page: z.number().nonnegative().max(100),
  perPage: z.number().nonnegative().max(5),
});

export type TGetProjectsDTO = z.infer<typeof GetProjectsDTO>;
