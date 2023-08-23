import { z } from "zod";

export const GetRepositoriesDTO = z.object({
  userId: z.string().nonempty(),
  page: z.number().nonnegative().max(100),
  perPage: z.number().nonnegative().max(5),
});

export type TGetRepositoriesDTO = z.infer<typeof GetRepositoriesDTO>;
