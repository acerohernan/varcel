import { z } from "zod";

export const GetUserDTO = z.object({
  userId: z.string().nonempty(),
});

export type TGetUserDTO = z.infer<typeof GetUserDTO>;
